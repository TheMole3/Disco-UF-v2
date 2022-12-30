<script>
import { Input, Helper, Button, Popover, Radio, ButtonGroup, InputAddon, FloatingLabelInput, CloseButton } from 'flowbite-svelte'

import { onMount } from 'svelte';

onMount(() => {
    //history.pushState({step: 0}, "", "/")
})

export let child = {...child}

export let removeChild;

let name = child.name;
let surname = child.surname;
let money = child.money||40;
let isLagstadie = child.isLagstadie

$: child = { ...child, name, surname, money, isLagstadie }

let stadie = child.isLagstadie==undefined?"":child.isLagstadie?"lag":"mellan";
$: {
    isLagstadie = stadie==""?undefined:stadie=="lag"?true:false;
}

let nameInput;
let surnameInput;
let moneyInput;
let stadieInput;
// If error
$: {
    nameInput = null;
    surnameInput = null;
    moneyInput = null;
    stadieInput = null;
    
    if(child.errors) {
        for(let error of child.errors) {
            switch(error) {
                case "name":
                    nameInput= "red"
                break;
                case "surname":
                    surnameInput = "red"
                break;
                case "money":
                    moneyInput = "red"
                break;
                case "stadie":
                    stadieInput = "red"
                break;
            }
        }
    }
}


</script>

<form>
    <div class="flex justify-between">
        <div class="grid gap-3 w-full mb-3 md:grid-cols-2">
        <div>
            <FloatingLabelInput color={nameInput} divClass="border-red-400 border-2 rounded" bind:value={name} type="text" style="filled" label="Förnamn" required/>
        </div>
        <div>
            <FloatingLabelInput color={surnameInput} bind:value={surname} type="text" style="filled" label="Efternamn" required/>
        </div>
        </div>
        <div class="top-0 ml-2">
            <CloseButton on:click={() => (removeChild(child.id))}></CloseButton>
        </div>
    </div>

    <div class="mb-3">
        <Helper for="money" class="mb-2">Att ladda på discokort</Helper>
        <ButtonGroup class="w-full">
        <Input color={moneyInput} bind:value={money} name="money" type="number" required />
        <InputAddon>kr</InputAddon>

        <Button id="hover" color="gray-200">?</Button>
        <Popover class="w-64 text-sm font-light " title="För köp i kiosken används Discokort!" triggeredBy="#hover" trigger="hover">
            Med discokortet behöver inte barnen bära runt på kontanter inne på discot utan de har istället sitt discokort som de i kiosken stämplar av när pengar används.
        </Popover>
        </ButtonGroup>  
    </div>

    <div class="grid gap-2 w-full grid-cols-2">
        <Radio bind:group={stadie} value="lag" name="custom" custom>
            <div class="inline-flex justify-between items-center p-4 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 {stadieInput?"border-red-500":""}">
                <div class="text-center w-full">Lågstadie</div>
            </div>
        </Radio>
        <Radio bind:group={stadie} value="mellan" name="custom" custom>
            <div class="inline-flex justify-between items-center p-4 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 {stadieInput?"border-red-500":""}">
                <div class="text-center w-full">Mellanstadie</div>
            </div>
        </Radio>
    </div>    
</form>