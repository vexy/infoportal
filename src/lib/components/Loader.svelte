<script lang="ts">
    export let showDetector = false;
    export let message = "";
</script>


{#if showDetector}
  <same_row>
    <div class="circle-pulse"></div>
    <p>Детекција новчаника у току...</p>
  </same_row>
{:else}
  <columns>
    <loader />
    <i>{message}</i>
  </columns>
{/if}

<style>
    p {
      color: #222222;
      text-shadow: #e0e0e0 1px 0.5px;
    }

    same_row {
      display: flex;
      flex-direction: row;
      align-items: center;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      gap: 5px;
    }

    columns {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 5px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    loader {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: inline-block;
      position: relative;
      border: 3px solid;
      border-color: transparent #64b3f4 transparent #c2e59c;
      box-sizing: border-box;
      animation: rotation 1s linear infinite;
    }
    loader::after,
    loader::before {
      content: '';  
      box-sizing: border-box;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      border: 3px solid;
      border-color: #64b3f4 transparent transparent transparent;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      box-sizing: border-box;
      animation: rotationBack 0.5s linear infinite;
      transform-origin: center center;
    }
    loader::before {
      width: 32px;
      height: 32px;
      border-color: #FFF #FFF transparent transparent;
      animation: rotation 1.5s linear infinite;
    }
    
    @keyframes rotation {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    } 
    @keyframes rotationBack {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(-360deg);
      }
    }

    .circle-pulse {
      --size: 24px;
      --paddingSize: 5px;
      --color: #aeebee;
      --animation-timing-function: linear;
      --animation-duration: 2s;
      position: relative;
      width: var(--size);
      height: var(--size);
      padding: var(--paddingSize);
    }

    .circle-pulse::before,
    .circle-pulse::after {
      content: '';
      position: absolute;
      inset: 0;
      background-color: var(--color);
      border-radius: 50%;
      opacity: 1;
      transform: scale(0);
      animation: var(--animation-timing-function) var(--animation-duration) infinite pulse-animation;
    }
    .circle-pulse::after {
      animation-delay: calc(var(--animation-duration) / 2);
    }

    @keyframes pulse-animation {
      0% {
        opacity: 1;
        transform: scale(0);
      }

      100% {
        opacity: 0;
        transform: scale(1);
      }
    }

</style>