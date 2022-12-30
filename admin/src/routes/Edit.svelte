
<script>
    import {Label, Input, Button, Badge, Toggle, Span} from 'flowbite-svelte';

    import { update, DB } from '$lib/DB';

    export let bookingID;

    let booking = {};
    $: booking = $DB[bookingID];

    let toPay = 0;
    $: {
        if(booking && booking.ID) {
            let discoDue = booking.children.reduce((a,b) => a + parseInt(b.money), 0);
            toPay =(discoDue || 0) + booking.children.length*30;
        }
    }

    let edit = false;

    let changeName = () => {
        let changes = {};
        changes[booking.ID] = {
            guardianName: booking.guardianName
        }
        update(changes)
    }
    let changeSurname = () => {
        let changes = {};
        changes[booking.ID] = {
            guardianSurname: booking.guardianSurname
        }
        update(changes)
    }
    let changePhone = () => {
        let changes = {};
        changes[booking.ID] = {
            phone: booking.phone
        }
        update(changes)
    }
    let changePaid = () => {
        let changes = {};
        changes[booking.ID] = {
            paid: !booking.paid
        }
        update(changes)
    }

    let changeChildName = (child) => {
        let changes = {};
        changes[child.booking.ID] = {children: []};
        changes[child.booking.ID].children[(""+child.childID).slice(-1)] = {
            name: child.name
        };
        update(changes)
    }
    let changeChildSurname = (child) => {
        let changes = {};
        changes[child.booking.ID] = {children: []};
        changes[child.booking.ID].children[(""+child.childID).slice(-1)] = {
            surname: child.surname
        };
        update(changes)
    }
    let changeChildMoney = (child) => {
        let changes = {};
        changes[child.booking.ID] = {children: []};
        changes[child.booking.ID].children[(""+child.childID).slice(-1)] = {
            money: child.money
        };
        update(changes)
    }
    let changeStadie = (child) => {
        let changes = {};
        changes[child.booking.ID] = {children: []};
        changes[child.booking.ID].children[(""+child.childID).slice(-1)] = {
            isLagstadie: !child.isLagstadie
        };
        update(changes)
    }
    let changeEntered = (child) => {
        let changes = {};
        changes[child.booking.ID] = {children: []};
        changes[child.booking.ID].children[(""+child.childID).slice(-1)] = {
            entered: !child.entered
        };
        update(changes)
    }

    
    </script>

{#if booking && booking.ID}
<div class="bg-gray-50 rounded-lg">

<div class="p-3 flex">
    <Span class="px-3">ID: {booking.ID}</Span>
    <Toggle size="small" color="red" bind:checked={edit}>Edit</Toggle>
</div>
<div>
    <div class="flex">
        <div class='flex-1 p-2'>
            <Label for='gFornamn' class='block mb-2'>Förälders förnamn</Label>
            <Input on:change={() => {changeName()}} disabled={!edit} size="sm" bind:value={booking.guardianName} placeholder="Förnamn" label="gFornamn"/>
        </div>
        <div class='flex-1 p-2'>
            <Label for='gEfternamn' class='block mb-2'>Förälders efternamn</Label>
            <Input on:change={() => {changeSurname()}} disabled={!edit} size="sm" bind:value={booking.guardianSurname} placeholder="Förälders efternamn" label="gEfternamn"/>
        </div>
    </div>
    <div class="flex">
        <div class='flex-[5_5_0%] p-2'>
            <Label for='tel' class='block mb-2'>Telefonnummer</Label>
            <Input on:change={() => {changePhone()}} disabled={!edit} size="sm" bind:value={booking.phone} placeholder="Telefonnummer" label="tel"/>
        </div>
        <div class='flex-[2_2_0%] p-2'>
            <Label for='pay' class='block mb-2'>Att betala</Label>
            <Input disabled size="sm" value={toPay + " kr"} placeholder="Att betala" label="pay"/>
        </div>
        <div class='flex-1 p-2 text-center'>
            <Label for='haspaid' class='block mb-2'>Betalat</Label>
            <Button on:click={() => {changePaid()}} disabled={!edit} class="w-0 h-8 aspect-square" size="sm" color="alternative">
                {booking.paid?"💸":"❌"}
            </Button>
        </div>
    </div>

    <br>

    <Label class="p-3">Barn</Label>
    <div class="flex text-xs">
        <div class='flex-[5_5_0%] p-2'>
            Namn
        </div>
        <div class='flex-[5_5_0%] p-2'>
            Efternamn
        </div>
        <div class='flex-[2_2_0%] p-2'>
            Stadie
        </div>
        <div class='flex-[2_2_0%] p-2'>
            Discokort
        </div>
        <div class='flex-1 p-2'>
            
        </div>
    </div>
    {#each booking.children as child}
        <div class="flex">
            <div class='flex-[5_5_0%] p-2'>
                <Input on:change={() => {changeChildName(child)}} disabled={!edit} size="sm" bind:value={child.name} placeholder="Namn" label="childName"/>
            </div>
            <div class='flex-[5_5_0%] p-2'>
                <Input on:change={() => {changeChildSurname(child)}} disabled={!edit} size="sm" bind:value={child.surname} placeholder="Efternamn" label="childName"/>
            </div>
            <div class='flex-[2_2_0%] p-2 text-center'>
                <Button on:click={() => {changeStadie(child)}} disabled={!edit} class="w-14 h-8" size="sm" color="alternative">
                    <Badge color={child.isLagstadie?"green":"yellow"}>{child.isLagstadie?"F-3":"4-6"}</Badge>
                </Button>
            </div>
            <div class='flex-[2_2_0%] p-2'>
                <Input on:change={() => {changeChildMoney(child)}} disabled={!edit} size="sm" bind:value={child.money} placeholder="Discokort" label="discokort"/>
            </div>
            <div class='flex-1 p-2 text-center'>
                <Button on:click={() => {changeEntered(child)}} class="w-0 h-8 aspect-square" size="sm" color="alternative">
                    {child.entered?"🚪":"🚶"}
                </Button>
            </div>
        </div>
    {/each}

</div>

</div>

{/if}