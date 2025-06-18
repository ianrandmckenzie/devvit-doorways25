import './createPost.js';

import { Devvit, useState, useWebView } from '@devvit/public-api';

import type { DevvitMessage, WebViewMessage } from './message.js';

Devvit.configure({
  redditAPI: true,
  redis: true,
});

// Add a custom post type to Devvit
Devvit.addCustomPostType({
  name: 'Doorways \'25',
  height: 'tall',
  render: (context) => {
    // Load username with `useAsync` hook
    const [username] = useState(async () => {
      return (await context.reddit.getCurrentUsername()) ?? 'anon';
    });

    // Load latest counter from redis with `useAsync` hook
    const [counter, setCounter] = useState(async () => {
      const redisCount = await context.redis.get(`counter_${context.postId}`);
      return Number(redisCount ?? 0);
    });

    const webView = useWebView<WebViewMessage, DevvitMessage>({
      // URL of your web view content
      url: 'index.html',

      // Handle messages sent from the web view
      async onMessage(message, webView) {
        switch (message.type) {
          case 'webViewReady':
            webView.postMessage({
              type: 'initialData',
              data: {
                username: username,
                currentCounter: counter,
              },
            });
            break;
          case 'setCounter':
            await context.redis.set(
              `counter_${context.postId}`,
              message.data.newCounter.toString()
            );
            setCounter(message.data.newCounter);

            webView.postMessage({
              type: 'updateCounter',
              data: {
                currentCounter: message.data.newCounter,
              },
            });
            break;
          default:
            throw new Error(`Unknown message type: ${message satisfies never}`);
        }
      },
      onUnmount() {
        context.ui.showToast('Web view closed!');
      },
    });

    // Render the custom post type
    return (
      <vstack grow padding="small" backgroundColor="#ffffff">
        <vstack grow alignment="middle center">
          <image url="doorways_25.png" imageWidth={128} imageHeight={128} />
          <text color="#000000" size="xlarge" weight="bold">
            Doorways '25
          </text>
          <spacer />
          <spacer />
          <vstack alignment="middle">
            <hstack>
              <text color="#333333" size="medium">Welcome!</text>
            </hstack>
            <hstack>
              <text color="#333333" size="medium">Everything you do in this app is saved to your browser.</text>
            </hstack>
            <hstack>
              <text color="#333333" size="medium">To wipe your data, click "Restart" from the Start menu.</text>
            </hstack>
            <hstack>
              <text color="#333333" size="medium" weight="bold">WARNING! "Restart" will delete all your changes permanently!</text>
            </hstack>
          </vstack>
          <spacer />
          <spacer />
          <button onPress={() => webView.mount()}>Launch App</button>
        </vstack>
      </vstack>
    );
  },
});

export default Devvit;
