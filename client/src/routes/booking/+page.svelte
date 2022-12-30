<script>
    import { onMount } from 'svelte';
    import { Progressbar, Spinner } from 'flowbite-svelte'
    import ChildInfo from './ChildInfo.svelte';
    import { tweened } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';
    import ParentInfo from './ParentInfo.svelte';
    import ConfirmBooking from './ConfirmBooking.svelte';
    import SendData from './SendData.svelte';
	import Payment from './Payment.svelte';

    let currentStep = 0;

    const progress = tweened(0, {
        duration: 300,
        easing: cubicOut
    });
    $: $progress = currentStep*25

    /* Booking data */
    let children = [];
    let booking = {};

    let retrivedOldBookingData = false;
    onMount(() => {
        if (typeof window !== 'undefined') {
            let bookingData = JSON.parse(sessionStorage.getItem('bookingData'));

            if(bookingData) {
                booking = bookingData;
                children = [...bookingData.children];
            } else {
                children = [{id: 0}]
            };
            retrivedOldBookingData = true;
        }

        // Run when history is recalled
        addEventListener('popstate', (event) => {
            console.log(event)
            if(typeof event.state.step !== 'undefined') currentStep = event.state.step
            console.log(currentStep)
        });
    });


    $: {
        if(retrivedOldBookingData) {
            booking = {...booking, children}
            if (typeof window !== 'undefined') sessionStorage.setItem('bookingData', JSON.stringify(booking))
        };
    }

</script>

<div id="container" class="bg-discoPurple select-none absolute h-full w-full overflow-x-hidden flex justify-center">
    {#if !retrivedOldBookingData}
        <div class="absolute w-screen text-center top-1/3">
            <div class="scale-150"><Spinner bg="text-discoPurple" color="blue" name="spinner"/></div>
            <br>
        </div>
    {:else}
    
        <div class="w-full lg:w-1/2">
            <div class="m-4">
                <Progressbar progress={$progress} size="h-1.5" />
            </div>

            {#if currentStep==0}
                <ChildInfo bind:currentStep={currentStep} bind:children={children}></ChildInfo>
            {:else if currentStep==1}
                <ParentInfo bind:booking={booking} bind:currentStep={currentStep}></ParentInfo>
            {:else if currentStep==2}
                <ConfirmBooking {booking} bind:currentStep={currentStep}></ConfirmBooking>
            {:else if currentStep==3}
                <SendData {booking} bind:currentStep={currentStep}></SendData>
            {:else if currentStep==4}
                <Payment {booking}></Payment>
            {/if}
        </div>

    {/if}
</div>

