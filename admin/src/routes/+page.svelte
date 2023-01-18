<script>
	import { Toggle, P, Navbar, NavUl, NavLi, Button } from 'flowbite-svelte';
	import SearchList from './SearchList.svelte';
    import Edit from './Edit.svelte';
    import { DB } from '$lib/DB';
    import {socket} from '$lib/socket'

    let parentMode= false;

    let newDB;
    $: newDB = $DB

    let selectedBookingID;
</script>

<div class="p-3">

    <Navbar rounded color="dark">
        <NavUl>
            <NavLi> <P size="sm">Barnläge </P> </NavLi>
            <NavLi> <Toggle bind:checked={parentMode} color="teal"></Toggle> </NavLi>
            <NavLi> <P size="sm">Föräldraläge</P> </NavLi>
        </NavUl>
        
        <NavUl>
            <P size="sm">🚪 Har gått in</P>
            <P size="sm">🚶 Har inte gått in</P>
            <P size="sm">💸 Har betalat</P>
            <P size="sm">❌ Har inte betalat</P>
        </NavUl>

        <NavUl>
            <Button on:click={() => {window.location.replace("https://apidisco.melo.se/login")}} pill outline class="!p-2" size="xs">Logga in</Button>
            <Button on:click={() => {socket.emit("updateDB")}} pill outline class="!p-2 aspect-[1/1]" size="xs">↻</Button>
        </NavUl>
    </Navbar>

    <div class="w-2/5 p-6 fixed top-25 right-0">
        <Edit bookingID={selectedBookingID}></Edit>
    </div>
    <div class="w-3/5 p-3">
        <SearchList bind:selectedBookingID={selectedBookingID} DB={newDB}></SearchList>
    </div>
    
    

</div>

                                      
