'use client';

import { useState, useEffect } from 'react';
import GameBoard from '@/components/GameBoard';
import { sdk } from '@farcaster/miniapp-sdk';

export default function Home() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [roomCode, setRoomCode] = useState<string>('');

  useEffect(() => {
    const init = async () => {
      try {
        await sdk.actions.ready();
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize:', error);
        setIsInitialized(true); // Still show UI even if SDK fails
      }
    };
    
    init();
  }, []);

  const createRoom = () => {
    // Generate a simple room code
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRoomCode(code);
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Loading Lucky Number 13...</h1>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!roomCode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Lucky Number 13</h1>
          <p className="text-gray-600 mb-6">
            Create a game room and invite your friends to play for BitRefill rewards!
          </p>
          <button
            onClick={createRoom}
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Create Game Room
          </button>
        </div>
      </div>
    );
  }

  return <GameBoard roomCode={roomCode} />;
}
