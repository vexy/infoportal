<svelte:head>
    <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
    <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0" nonce="wSi4nIyg"></script>
</svelte:head>

<div id="fb-root"></div>
<footer>
    <p>Made with ❤️ in 🇷🇸</p>
    
    <!-- LINKS (TODO: Update with font links)-->
    <a href="/terms">Услови коришћења</a>
    <!-- <a href="">Коришћени фонтови</a> 
    <div>
        <img src="/src/assets/github/github-mark.svg" alt="gh_logo" style="width: 20px; height: 20px"/>
        <a href="https://github.com/vexy" target="_blank">Аутор платформе</a>
    </div> -->
    
    <!-- Social: Twitter and Facebook buttons -->
    <!-- <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-size="large" data-url="https://infoportal.app" data-hashtags="infoportal" data-show-count="false">Tweet</a>
    <div class="fb-like" data-href="https://infoportal.app" data-width="" data-layout="" data-action="" data-size="" data-share="true"></div> -->

    <code>Version: 1.5</code>
</footer>

<style>
    footer {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding: 5px;
        background-image: linear-gradient(90deg, #ccc8ea 0%, #989ce8 50%, #ccc8e0);
        border-top: 1.5px solid rgb(225, 225, 225);
    }

    code {
        background-color: #989ce8;
        border-radius: 1.5px;
    }

    /* Small screens */
    @media all and (max-width: 500px) {

    }
</style>