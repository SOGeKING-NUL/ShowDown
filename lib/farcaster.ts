import { sdk } from '@farcaster/miniapp-sdk';

// Initialize the mini app
export const initializeMiniApp = async () => {
  try {
    // Call ready() to hide splash screen and display content
    await sdk.actions.ready();
    console.log('Farcaster Mini App initialized successfully');
    return true;
  } catch (error) {
    console.error('Failed to initialize Mini App:', error);
    return false;
  }
};

// Get user context information
export const getUserInfo = async () => {
  try {
    const context = await sdk.context;
    return context;
  } catch (error) {
    console.error('Failed to get user info:', error);
    return null;
  }
};
