
<script>
    import MiniSearch from 'minisearch'
    import { Button, Search, Table, TableHead, TableHeadCell, TableBody, Input } from 'flowbite-svelte';
	import ChildSearchRow from './ChildSearchRow.svelte';

    export let DB;
    export let selectedBookingID;

    let searchTerm = "";
    let results = [];
    let fuse;
    let childDB = [];
    let cutResults = [];
    $: cutResults = results.length?results.splice(0, 30):childDB.splice(0, 30);

    let miniSearch = new MiniSearch({
        idField: 'childID', // Use the 'ID' field as the unique id for bookings

        fields: ['childID', 'name', 'surname', 'guardianName'], // Fields to index for full-text search
        storeFields:  ['childID', 'name', 'surname', 'isLagstadie', 'money', 'entered', 'booking'], // Fields to keep and store in filtered results

        extractField: (document, fieldName) => { // Apply special conditions to some fields
            if(fieldName === 'guardianName') { 
                return (document['booking'].guardianName + " " + document['booking'].guardianSurname); // Join 
            }
    
            return fieldName.split('.').reduce((doc, key) => doc && doc[key], document) // Other fieldNames
        }
    })
    

    $: {
        childDB = []
        for(const booking of Object.values(DB)) {
            for(const child of booking.children) {
                if(!child.childID) continue;
                childDB.push(child)
            }
        }

        miniSearch.removeAll()
        miniSearch.addAll(Object.values(childDB))
    }

    let searchChanged = () => {
        results = miniSearch.search(searchTerm, { prefix: true, fuzzy: 0.1, combineWith: "AND", boost: {name: 2, surname: 2} });
    }

</script>

<form class="flex gap-2 py-3">
    <Input size="md" placeholder="Sök" bind:value={searchTerm} on:keyup={searchChanged} />
    <Button class="!p-2.5">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
    </Button>
</form>

<div class="text-center">

    <Table hoverable striped={true}>
        <TableHead>
            <TableHeadCell class="w-1"></TableHeadCell>
            <TableHeadCell>Förnamn</TableHeadCell>
            <TableHeadCell>Efternamn</TableHeadCell>
            <TableHeadCell>Discokort</TableHeadCell>
            <TableHeadCell>ID</TableHeadCell>
        </TableHead>

        <TableBody class="divide-y">    
            {#each cutResults as child }
                <ChildSearchRow bind:selectedBookingID={selectedBookingID} child={child.item || child}></ChildSearchRow>
            {/each}
        </TableBody>
    </Table>

</div>