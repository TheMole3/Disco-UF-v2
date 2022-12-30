<script>
    import { onMount } from 'svelte';
    onMount(() => {
        //history.pushState({step: 1}, "", "/")
    })

    import { Input, Helper, Button, Popover, Radio, ButtonGroup, InputAddon, Heading, CloseButton, FloatingLabelInput } from 'flowbite-svelte'

    export let currentStep;

    export let booking;
    let guardianName = booking.guardianName;
    let guardianSurname = booking.guardianSurname;
    let phone = booking.phone;
    $: booking = {...booking, guardianName, guardianSurname, phone}

    let nameC;
    let surC;
    let phoneC;

    let verifyData = () => {
        nameC = null;
        surC = null;
        phoneC = null;
        if(!guardianName) nameC = "red"
        if(!guardianSurname) surC = "red"
        if(!phone) phoneC = "red"

        if(guardianName && guardianSurname && phone) currentStep = 2;
    }
</script>

<Heading tag="h3" class="mx-10">Barnens kontaktperson</Heading>

<div class="m-8 p-4 bg-slate-50 rounded-lg shadow-lg animate-fallIn transition-all">
    <form>
        <div class="grid gap-3 w-full mb-3 md:grid-cols-2">
            <div>
            <FloatingLabelInput color={nameC} bind:value={guardianName} type="text" style="filled" label="Förnamn" required/>
            </div>
            <div>
            <FloatingLabelInput color={surC} bind:value={guardianSurname} type="text" style="filled" label="Efternamn" required/>
            </div>
        </div>
        <FloatingLabelInput color={phoneC} bind:value={phone} type="tel" style="filled" label="Telefonnummer" required />
    </form>
</div>

<div class="grid gap-3 pb-10 grid-cols-2 ">
    <div class="text-center">
        <Button on:click={()=>{currentStep=0}} name="addChild" pill={true} outline={true} class="!p-2" size="xl"><svg aria-hidden="true" class="w-5 h-5 text-center rotate-180" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></Button>
        <Helper class="pt-2" for="addChild">Tillbaka</Helper>
    </div>
    <div class="text-center">
        <Button on:click={verifyData} name="addChild" pill={true} outline={true} class="!p-2" size="xl"><svg aria-hidden="true" class="w-5 h-5 text-center" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></Button>
        <Helper class="pt-2" for="addChild">Nästa steg</Helper>
    </div>
</div>