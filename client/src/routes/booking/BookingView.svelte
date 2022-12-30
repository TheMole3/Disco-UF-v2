<script>
    import { onMount } from 'svelte';
    onMount(() => {
        //history.pushState({step: 2}, "", "/")
    })

    import {Heading, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell} from 'flowbite-svelte'

    export let booking;

    let discoDue = booking.children.reduce((a,b) => a + parseInt(b.money), 0);
    let totalDue = (discoDue || 0) + booking.children.length*30;
</script>


<div class="m-8 select-none overflow-hidden bg-slate-50 rounded-lg shadow-lg animate-fallIn transition-all">
    <Table striped={true}>
        <TableBody class="divide-y">
          <TableBodyRow>
            <TableBodyCell>Inträde</TableBodyCell>
            <TableBodyCell>{booking.children.length}x</TableBodyCell>
            <TableBodyCell>30 kr</TableBodyCell>
          </TableBodyRow>
          {#each booking.children as child}
            <TableBodyRow>
                <TableBodyCell>Discokort</TableBodyCell>
                <TableBodyCell>1x</TableBodyCell>
                <TableBodyCell>{child.money} kr</TableBodyCell>
            </TableBodyRow>
          {/each}
        </TableBody>
        <tfoot>
            <tr class="font-semibold text-gray-900 dark:text-white">
              <th scope="row" class="py-3 px-6 text-base">Att betala</th>
              <td class="py-3 px-6"></td>
              <td class="py-3 px-6">{totalDue} kr</td>
            </tr>
          </tfoot>
      </Table>
</div>