import { NextResponse } from 'next/server';
import { roomService, agentDispatchClient } from '@/lib/server-utils';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { numbers, prompt } = body;

        if (!numbers || !Array.isArray(numbers) || numbers.length === 0) {
            return NextResponse.json({ error: "List of phone numbers is required" }, { status: 400 });
        }

        const results = [];

        for (const phoneNumber of numbers) {
            try {
                const roomName = `call-${phoneNumber.replace(/\+/g, '')}-${Math.floor(Math.random() * 10000)}`;

                const metadata = JSON.stringify({
                    phone_number: phoneNumber,
                    user_prompt: prompt || "",
                    model_provider: "groq",
                    voice_id: "alloy",
                });

                // 1. Create the room
                await roomService.createRoom({
                    name: roomName,
                    metadata: metadata,
                    emptyTimeout: 60 * 5,
                });

                // 2. Dispatch agent — agent will read phone_number and place the SIP call.
                //    Agent is the sole dialer to prevent double-calling.
                await agentDispatchClient.createDispatch(roomName, 'outbound-caller', {
                    metadata: metadata,
                });

                results.push({ phoneNumber, status: 'dispatched', roomName });

                // Prevent API flooding between numbers
                await new Promise(r => setTimeout(r, 500));

            } catch (e: any) {
                console.error(`Failed to dispatch ${phoneNumber}:`, e);
                results.push({ phoneNumber, status: 'failed', error: e.message });
            }
        }

        return NextResponse.json({
            success: true,
            message: `Processed ${numbers.length} numbers`,
            results
        });

    } catch (error: any) {
        console.error("Queue error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
