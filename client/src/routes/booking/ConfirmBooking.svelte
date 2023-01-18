<script>
    import {Button, Helper, Checkbox, P, Heading} from 'flowbite-svelte'
	import BookingView from './BookingView.svelte';
    import Privacy from './Privacy.svelte';

    export let currentStep;
    export let booking;

    let privacyOpen = false;

    let terms = false;
    let privacy = false;
    let termCheck;
    let privacyCheck;
    $: if(terms) termCheck.classList.remove('bg-red-200')
    $: if(privacy) privacyCheck.classList.remove('bg-red-200')
    let verifyData = () => {
        if(!terms) {
            termCheck.classList.remove('animate-fallIn')
            setTimeout(()=>{termCheck.classList.add('animate-fallIn')},10)
            termCheck.classList.add('bg-red-200')
        }
        if(!privacy) {
            privacyCheck.classList.remove('animate-fallIn')
            setTimeout(()=>{privacyCheck.classList.add('animate-fallIn')},10)
            privacyCheck.classList.add('bg-red-200')
        }
        if(terms && privacy) {
            currentStep = 3
        }
    }
</script>

<Privacy bind:open={privacyOpen}></Privacy>

<Heading tag="h3" class="mx-10">Ordervy</Heading>
<BookingView {booking}></BookingView>

<div class="m-8 p-4 select-none bg-slate-50 rounded-lg shadow-lg animate-fallIn transition-all">

    <div class="my-3 rounded border-2 border-gray-300 max-h-24 overflow-y-scroll">
        <Heading tag="h7" class="ml-2">Bokningsvillkor</Heading>
        <P class=" p-2" weight="light" color="text-gray-500 dark:text-gray-400">
            OBS! Bokningen måste göras av målsman.            
        </P>
    </div>
    <div bind:this={termCheck} class="w-fit rounded p-1">
        <Checkbox bind:checked={terms}>Jag accepterar bokningsvillkoren</Checkbox>
    </div>
    <div bind:this={privacyCheck} class="w-fit rounded p-1">
        <Checkbox bind:checked={privacy}>Jag accepterar <a href="/" on:click={(e)=>{e.preventDefault(); privacyOpen = true}} class="text-blue-600 dark:text-blue-500 hover:underline ml-1">integritetspolicyn</a></Checkbox>
    </div>
</div>

<div class="grid gap-3 pb-10 grid-cols-2 ">
    <div class="text-center">
        <Button on:click={()=>{currentStep=1}} name="back" pill={true} outline={true} class="!p-2" size="xl"><svg aria-hidden="true" class="w-5 h-5 text-center rotate-180" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></Button>
        <Helper class="pt-2" for="addChild">Tillbaka</Helper>
    </div>
    <div class="text-center">
        <Button on:click={verifyData} name="next" pill={true} outline={true} class="!p-2" size="xl"><svg aria-hidden="true" class="w-5 h-5 text-center" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></Button>
        <Helper class="pt-2" for="addChild">Bekräfta bokningen</Helper>
    </div>
</div>