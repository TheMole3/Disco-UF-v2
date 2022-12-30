<script>
    import { onMount, onDestroy } from 'svelte';
    import {discoDate} from '../config'

    let until, days, hours, minutes, seconds;
    $: {
        seconds = Math.floor((until)/1000);
        minutes = Math.floor(seconds/60);
        hours = Math.floor(minutes/60);
        days = Math.floor(hours/24);

        hours = hours-(days*24);
        minutes = minutes-(days*24*60)-(hours*60);
        seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);
    }
    let interval = setInterval(() => {
        let currentDate = new Date();

        until = discoDate.getTime() - currentDate.getTime();

    }, 1000)

    let loaded = false;
    let container;
    $: {
        if(typeof until !== 'undefined') loaded = true;
        if(container) container.classList.add("xyz-in")
    }

    onDestroy(() => {
        clearInterval(interval)
    })
</script>

{#if loaded}
    <div xyz="fade flip-down up" bind:this={container} class="grid grid-flow-col gap-1 md:gap-3 text-center auto-cols-max drop-shadow-lg text-sm font-thin">
        
        <div class="flex flex-col p-2 rounded-box text-primary-content">
        <span class="countdown font-mono text-4xl md:text-5xl">
            <span style="--value:{days};"></span>
        </span>
        {days != 1 ? "dagar" : "dag"}
        </div> 
        <div class="flex flex-col p-2 rounded-box text-primary-content">
        <span class="countdown font-mono text-4xl md:text-5xl">
            <span style="--value:{hours};"></span>
        </span>
        {hours != 1 ? "timmar" : "timme"}
        </div> 
        <div class="flex flex-col p-2 rounded-box text-primary-content">
        <span class="countdown font-mono text-4xl md:text-5xl">
            <span style="--value:{minutes};"></span>
        </span>
        min
        </div> 
        <div class="flex flex-col p-2 rounded-box text-primary-content">
        <span class="countdown font-mono text-4xl md:text-5xl">
            <span style="--value:{seconds};"></span>
        </span>
        sek
        </div>
    </div>
{/if}
