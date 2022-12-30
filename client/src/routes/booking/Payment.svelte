<script>
    import {Button, Helper, Heading, P} from 'flowbite-svelte'
	import BookingView from './BookingView.svelte';

    export let booking;

    let discoDue = booking.children.reduce((a,b) => a + parseInt(b.money), 0);
    let totalDue = (discoDue || 0) + booking.children.length*30;
</script>

<Heading tag="h3" class="mx-10">Ordervy</Heading>
<BookingView {booking}></BookingView>

<div class="m-8 mb-4 p-4 select-none bg-slate-50 rounded-lg shadow-lg animate-fallIn transition-all">
    <Heading tag="h6">Betala med swish!</Heading>
    <P><span class="text-red-600">OBS!</span> Ange koden <b>{booking.code}</b> i medelandet</P>
    <br>
    <P>Swisha <i>{totalDue} kr</i>&nbsp; till nummret 123 672 98 75</P>
</div>

<div class="m-8 mt-4 p-4 select-none bg-slate-50 rounded-lg shadow-lg animate-fallIn transition-all">
    <p>Barnet hämtar ut sitt discokort i entrén genom att uppge sitt namn.</p>
    <br>
    <b>Ställ er i förbetalningskön, den har öppet</b>
    <br/>
    Lågstadie: 17:00 - 17:20<br/>
    Mellanstadie: 19:45 - 20:05
</div>

<div class="text-center pb-8">
    <Button on:click={() => {window.location.replace("https://disco.melo.se")}} name="next" pill={true} outline={true} class="!p-2 rotate-180" size="xl"><svg aria-hidden="true" class="w-5 h-5 text-center" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></Button>
    <Helper class="pt-2" for="addChild">Tillbaka till start</Helper>
</div>
