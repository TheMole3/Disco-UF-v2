<script>
    import {onMount} from 'svelte'
    import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

    export let duration = 2000;
    export let onDone;

	const progress = tweened(0, {
		duration: Number(duration) + 500,
		easing: cubicOut
	});

    let text;
    let background;

    onMount(() => {
        $progress = 100;
        setTimeout(done, duration)
    })

    let done = () => {
        text.classList.remove("animate__jackInTheBox")
        text.classList.remove("anim-delay-400")
        text.classList.add("animate__hinge")
        setTimeout(() => {
            background.classList.add("xyz-out")
            onDone()
        }, 500)
    }
</script>

<style>
    .anim-delay-400 {
        animation-delay: 400ms;
    }
</style>

<div class="fixed pointer-events-none w-screen h-screen z-50 overflow-hidden">
    <div bind:this={background} xyz="down-100%" class="w-screen h-screen bg-primary flex justify-center">
        <progress xyz="fade-100%" class="xyz-in progress progress-secondary bg-primary w-56 lg:w-96 top-[48vh] md:top-[50vh] lg:top-[58vh]" value={$progress || 0} max="100"></progress>

        
        <div bind:this={text} class="absolute top-1/3 anim-delay-400 animate__animated animate__jackInTheBox text-center">
            <p class="font-DiscoFont text-accent drop-shadow-navText text- text-7xl md:text-8xl lg:text-9xl">DISCO MELO</p>
        </div>

    </div>
</div>
