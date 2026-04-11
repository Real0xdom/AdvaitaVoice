import { NextResponse } from 'next/server';
import { roomService, agentDispatchClient } from '@/lib/server-utils';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { phoneNumber, prompt, modelProvider, voice } = body;

        if (!phoneNumber) {
            return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
        }

        // Generate a unique room name for this call
        const roomName = `call-${phoneNumber.replace(/\+/g, '')}-${Math.floor(Math.random() * 10000)}`;

        const metadata = JSON.stringify({
            phone_number: phoneNumber,
            user_prompt: prompt || "",
            model_provider: modelProvider || "groq",
            voice_id: voice || "alloy",
        });

        console.log(`Dispatching call to ${phoneNumber} in room ${roomName}`);

        // 1. Create the room with metadata so the agent knows the context
        await roomService.createRoom({
            name: roomName,
            metadata: metadata,
            emptyTimeout: 10 * 60, // 10 minutes
        });

        // 2. Dispatch the AI agent — the agent will read phone_number from metadata and dial.
        //    The agent is the ONLY entity that places the SIP call, preventing double-dialing.
        await agentDispatchClient.createDispatch(roomName, 'outbound-caller', {
            metadata: metadata,
        });
        console.log(`Agent dispatched to room ${roomName} — agent will dial ${phoneNumber}`);

        return NextResponse.json({
            success: true,
            roomName,
        });

    } catch (error: any) {
        console.error("Error dispatching call:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
