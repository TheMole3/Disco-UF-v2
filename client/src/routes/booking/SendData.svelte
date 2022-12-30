<script>
	import { json } from '@sveltejs/kit';
    import {Spinner, Label, Modal, Button, Heading, P} from 'flowbite-svelte'
    import { onDestroy, onMount } from 'svelte';
    import config from './config.json'

    export let currentStep;
    export let booking;

    /*Loading icon*/
    let dot = "";
    let direction = true;
    const dotInterval = setInterval(() => {
        if(direction) dot += ".";
        else dot = dot.slice(0, -1);

        if(dot.length >= 3 || dot.length <= 0) direction = !direction
    }, 700);

    onDestroy(() => clearInterval(dotInterval));

    /*Send booking to server*/
    onMount(() => {
        let formDataWrong = false;

        let jsonData = {
            guardianName: booking.guardianName,
            guardianSurname: booking.guardianSurname,
            phone: booking.phone,
            children: []
        };
        if(!booking.guardianName || !booking.guardianSurname || !booking.phone) formDataWrong = true;

        for(let child of booking.children) {
            jsonData.children.push({
                name: child.name,
                surname: child.surname,
                isLagstadie: child.isLagstadie,
                money: child.money
            })
            if(!child.name || !child.surname || child.isLagstadie == undefined || !child.money) formDataWrong = true;
        }

        if(formDataWrong) {
            error = "Wrong form data"
            popupModal = true;
        } else {
            fetch(config.server + '/addBooking', {  // Enter your IP address here
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
                
            }).then((response) => response.json())
            .then((data) => {
                console.log(data)
                booking.code = data.ID
                currentStep = 4
                sessionStorage.removeItem("bookingData")
            })
            .catch((err) => {
                error = err.message
                popupModal = true;
            });
        }

    })

    /*Error popup*/
    let popupModal = false;
    let error = "";

</script>


<div class="absolute w-screen md:w-1/2 text-center top-1/3">
    <div class="scale-150"><Spinner bg="text-discoPurple" color="blue" name="spinner"/></div>
    <br>
    <Label for="Spinner">Laddar{dot}</Label>
</div>

<Modal bind:open={popupModal} color="red" size="xs" permanent>
    <div class="text-center">
        <svg aria-hidden="true" class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Någonting gick fel!</h3>
        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Försök igen senare eller kontakta disco@melo.se</h3>
        <Button on:click={() => window.location.replace("https://disco.melo.se")} color='alternative'>Okej</Button>
        <br>
        <div class="my-3 rounded border-2 border-gray-300 max-h-24 overflow-y-scroll">
            <P class=" p-2 select-text" weight="light" color="text-gray-500 dark:text-gray-400">
                {error}
            </P>
        </div>
    </div>
</Modal>