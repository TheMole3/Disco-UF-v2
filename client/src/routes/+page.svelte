<script>
    import {onMount, onDestroy} from 'svelte'
    import Loading from './Loading.svelte'
    import CountDown from './Countdown.svelte'
    import Karusell from './Karusell.svelte';
    import { tweened } from 'svelte/motion';

    /* Background movement */
    const backgroundTween = tweened(0, {
		duration: 50000,
	});
    let background;
    let interval = setInterval(() => {
            $backgroundTween = Number($backgroundTween) + 1000
    }, 50000)

    onMount(() => {
        $backgroundTween = 1000;
    })

    onDestroy(() => {
        clearInterval(interval)
    })
</script>

<style>
    .background {
        background: linear-gradient(45deg, hsla(var(--s)) 12.5%, hsla(var(--s)/.9) 12.5%, hsla(var(--s)/.9) 37.5%, hsla(var(--s)) 37.5%, hsla(var(--s)) 62.5%, hsla(var(--s)/.9) 62.5%, hsla(var(--s)/.9) 87.5%, hsla(var(--s)) 87.5%);
        background-size: 50px 50px;
        background-position: 50px 50px;
    }
</style>

<div bind:this={background} style={`background-position: ${Math.ceil($backgroundTween)}px 50px`} class="h-screen w-screen background top-0 absolute overflow-x-hidden font-oswald">

    <Loading duration=1500></Loading>

    <div class="w-full mt-10 flex flex-col items-center justify-center transition-all duration-1000">
        <div class="h-32 md:h-36 w-5/6 md:w-96 stats shadow ">
            <div class="stat flex flex-col items-center">
                <div class="stat-title">Snart är det dags!</div>
                <div class="stat-value text-center"><CountDown></CountDown></div>
            </div>            
        </div>
    </div>

    <div class="w-full flex justify-center mt-2">
        <Karusell></Karusell>
    </div>

    <div class="py-14"></div>
    <footer class="fixed shadow bottom-0 footer items-center grid-flow-col p-4 bg-neutral text-neutral-content">
        <div class="items-center grid-flow-col">
            <p class="font-DiscoFont text-accent drop-shadow-navText text-3xl">DISCO MELO</p>
        </div> 
        <div class="grid-flow-col gap-4 place-self-center justify-self-end">
            <a href="mailto:disco@melo.se"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path class="fill-neutral-content" d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg></a>
            <a href="tel:0114610601"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path class="fill-neutral-content" d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg></a>
        </div>
    </footer>
    
</div>

