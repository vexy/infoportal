<svelte:head>
    <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
	<script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0" nonce="p4x0qImg"></script>

    <script>(function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0";
        fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    </script>
</svelte:head>
<script lang="ts">
    import gh_logo from "$lib/assets/github-mark.svg";
</script>

<div id="fb-root"></div>
<footer>
    <p>Made with ❤️ in 🇷🇸</p>

    <!-- Social: Twitter and Facebook buttons -->
    <social>
        <a href="https://twitter.com/intent/tweet?button_hashtag=infoportal&ref_src=twsrc%5Etfw" 
            class="twitter-hashtag-button" 
            data-size="large" 
            data-text="A fun place to hear everyone&#39;s opinion. Blockchain based."
            data-url="https://infoportal.app"
            data-hashtags="blockchain"
            data-show-count="true">Tweet #infoportal
        </a>
        <div class="fb-share-button" 
            data-href="https://infoportal.app" 
            data-layout="button_count"
            data-size="large">
        </div>
    </social>

    <links>
        <div>
            <img src={gh_logo} alt="gh_logo"/>
            <a href="https://github.com/vexy" target="_blank">Аутор платформе</a>
        </div>
        <span><a href="/terms">Услови коришћења</a></span>
        <!-- LINKS (TODO: Update with font links)-->
        <span><a href="https://fonts.google.com/" target="_blank">Коришћени фонтови</a></span>
    </links>

    <version-box>
        <span>Version:</span>
        <code>
            <span class="material-symbols-outlined">code</span>
            <a href="https://github.com/vexy/infoportal" target="_blank">1.7.1</a>
        </code>
    </version-box>
</footer>

<style>
    footer {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-block: 0.75em;
        gap: 0.5em;
        border-top: 1px solid #dcdcdc;
        /* background-image: linear-gradient(135deg, #FD6E6A 10%, #FFC600 100%); */
        background-image: linear-gradient(to top, #5b6050 0%, #2d58c4 100%);
        color: #1b1a7c;
    }

    p {
        margin: unset;
        padding-inline: 0.85em;
        font-weight: 400;
        border: none;
        border-radius: 1em;
        box-sizing: border-box;
        transition: all 650ms;
        background-color: transparent;
    }

    p:hover {
        color: #21136dc7;
        text-shadow: 1px 0px #abacad;
        /* font-style: italic; */
        font-weight: 500;
        box-shadow: 1px 1px 5px 2px #330867,
                    -1px -1px 5px 2px #fff;
    }

    social {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        gap: 0.5em;
    }

    links {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-evenly;
        gap: 0.25em;
        padding-block: 0.5em;
        width: 100%;
    }

    links div {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.25em;
    }

    links a:hover {
        color: #fff;
    }

    links a:visited {
        color: #1b1a7c;
    }

    img {
        width: 15px;
        height: 15px;
    }

    version-box {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5em;
    }

    code {
        display: flex;
        flex-direction: row;
        align-items: center;
        background-color: #d9daea;
        font-weight: 600;
        border-radius: 0.35em;
        padding-inline: 0.5em;
    }

    /* Small screens */
    @media all and (max-width: 500px) {
        footer {
            color: #f9fafa;
            border-top: 1px solid #ca9e10;
            background-image: linear-gradient(135deg, #e27775 10%, #ca9e00 100%);
        }

        links {
            font-size: smaller;
            flex-direction: column;
            align-items: center;
        }

        version-box {
            font-size: smaller;
        }
    }
</style>