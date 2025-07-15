'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sdk } from '@farcaster/miniapp-sdk';

interface GameBoardProps {
  roomCode?: string;
}

export default function GameBoard({ roomCode }: GameBoardProps) {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [gameState, setGameState] = useState<'waiting' | 'selecting' | 'playing' | 'finished'>('waiting');
  const [players, setPlayers] = useState<string[]>([]);
  const [isSDKReady, setIsSDKReady] = useState(false);

  useEffect(() => {
    const initializeSDK = async () => {
      try {
        // Initialize the SDK and hide splash screen
        await sdk.actions.ready();
        setIsSDKReady(true);
        
        // Get user context
        const context = await sdk.context;
        console.log('User context:', context);
        
        // Set initial game state
        setGameState('selecting');
      } catch (error) {
        console.error('Failed to initialize SDK:', error);
      }
    };
    
    initializeSDK();
  }, []);

  const handleNumberSelect = (number: number) => {
    setSelectedNumber(number);
    // Here you'll integrate with your backend to lock the number
  };

  const renderNumberGrid = () => {
    const numbers = Array.from({ length: 100 }, (_, i) => i + 1);
    
    return (
      <div className="grid grid-cols-10 gap-2 max-w-2xl mx-auto">
        {numbers.map((number) => (
          <motion.button
            key={number}
            onClick={() => handleNumberSelect(number)}
            className={`
              w-12 h-12 rounded-lg border-2 font-semibold text-sm
              ${selectedNumber === number 
                ? 'bg-blue-500 text-white border-blue-600' 
                : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={gameState !== 'selecting'}
          >
            {number}
          </motion.button>
        ))}
      </div>
    );
  };

  if (!isSDKReady) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Loading Lucky Number 13...</h1>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Lucky Number 13</h1>
            <p className="text-gray-600">Select the number closest to the secret number!</p>
            {roomCode && (
              <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                <span className="text-sm text-gray-600">Room Code: </span>
                <span className="font-mono font-bold text-lg">{roomCode}</span>
              </div>
            )}
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-center">Players ({players.length})</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {players.map((player, index) => (
                <div key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {player}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-center">Select Your Lucky Number</h3>
            {renderNumberGrid()}
          </div>

          {selectedNumber && (
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-100 text-green-800 p-4 rounded-lg inline-block"
              >
                Your selected number: <span className="font-bold text-2xl">{selectedNumber}</span>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
