<script>
    import { onMount, onDestroy } from "svelte";
    import "@lottiefiles/lottie-player";

    let carousel;

    /* Stagger */
    let stagger = "opacity-0";

    /* Candy roller */
    let candyI = 0;
    let candys = ["🍭", "🍫", "🍬", "🧃", "😋"]
    let candyIn, candyOut;
    let updateCandy = () => {
        if(!candyIn || !candyOut) return;

        candyIn.classList.remove("xyz-in");
        candyOut.classList.remove("xyz-out");

        // Reflow
        candyIn.offsetHeight;
        candyOut.offsetHeight;

        candyIn.innerHTML = candys[candyI]
        candyOut.innerHTML = candys[(candyI-1)>=0?(candyI-1):(candys.length-1)]

        candyIn.classList.add("xyz-in");
        candyOut.classList.add("xyz-out");

        candyI++
        if(candyI >= candys.length) candyI = 0;
    }

    let candyInterval = setInterval(updateCandy, 1800)


    /* Touch indicator */
    let swipeHint;
    let showSwipeHint = false;
    let touched = false;

    let isTouchDevice = () => {
        return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
    }

    let onTouch = () => {
        touched = true;

        if(!swipeHint) return;
        swipeHint.classList.add("xyz-out")
        swipeHint.classList.remove("xyz-in")
    }

    let showSwipe = () => {
        if(touched) return;

        showSwipeHint = true;
    }

    let touchInit = () => {
        if(isTouchDevice() && carousel) {

            carousel.addEventListener('touchstart', onTouch);
            carousel.addEventListener('touchmove', onTouch);
            carousel.addEventListener('scroll', onTouch);
            
            setTimeout(showSwipe, 5000)
        }
    }

    

    onMount(() => {
        updateCandy()
        touchInit()

        setTimeout(() => {
            stagger = "xyz-in"
        }, 2100)

        // Make scrolling work
        if(typeof window !== "undefined") {
            window.addEventListener("wheel", function (e) {
                if (e.deltaY > 0) carousel.scrollLeft += 250;
                else carousel.scrollLeft -= 250;
            });
        }
    })

    onDestroy(() => {
        clearInterval(candyInterval)
    })

</script>

{#if showSwipeHint}
    
<div bind:this={swipeHint} xyz="fade" class="xyz-in pointer-events-none absolute z-40 right-0">
    <lottie-player class="w-56" src="https://assets8.lottiefiles.com/packages/lf20_xpxbhrm4.json"  background="transparent"  speed="1" loop autoplay></lottie-player>
</div>

{/if}

<div bind:this={carousel} xyz="fade up-3 stagger-1.5" class="carousel carousel-center p-4 space-x-4 px-[8.333%] lg:flex-wrap lg:justify-center">

    <div class="{stagger} carousel-item mb-4">
        <div class="card w-64 bg-primary text-primary-content drop-shadow">
            <div class="card-body">

              <h2 class="card-title">FÖRBETALNING!</h2>
              <p class="mb-4">Förbetala och kom in snabbare!</p>

              <div class="card-actions justify-end">
                <a href="/booking" class="btn">Till förbetalningen</a>
              </div>
              <div class="card-actions justify-end">
                <button class="btn">Om förbetalning</button>
              </div>

            </div>
        </div>
    </div> 

    <div class="{stagger} carousel-item mb-4">
        <div class="card w-68 bg-base-100 text-primary-content drop-shadow">
            <div class="card-body">
                <h2 class="card-title flex-nowrap whitespace-nowrap">TID & PLATS 
                    <div class="flex h-8">
                        <span class="w-8 absolute text-center">🕘</span>
                    </div>
                </h2>
                <div class="flex w-full h-1/3 mt-4 flex-row items-center justify-center text-center">
                    <div>
                        <span>Lågstadie</span><br>
                        <span>17:00 - 18:45</span>
                    </div>
                    <div class="divider divider-horizontal"></div>
                    <div>
                        <span>Mellanstadie</span><br>
                        <span>19:45 - 21:30</span>
                    </div>
                </div>
                <div class="mt-4">
                    Curt Nicolin Gymnasiet<br>
                    Finnvedsvägen 4<br>
                    612 30 Finspång<br>
                </div>
            </div>
        </div>
    </div> 

    <div class="{stagger} carousel-item mb-4">
        <div class="card w-80 md:w-96 bg-base-100 text-primary-content drop-shadow">
            <div class="card-body">
                <h2 class="card-title">BETALNING
                        <div class="flex h-8">
                            <span class="w-8 absolute text-center">💸</span>
                        </div>
                </h2>
                <div class="w-full">
                    <p class="">Inträdet är 30kr</p>
                    
                    <p class="mt-2 font-thin"> 
                        Förbetalning är det smidigaste sättet att betala på. Då får du en egen kö till discot, barnet uppger bara sitt namn i entrén
                    </p>
                    <p class="mt-4 font-thin">
                        Det går även att betala med swish eller kontant i entrén.
                    </p>
                </div>
                <div class="card-actions justify-end lg:hidden">
                    <a href="/booking" class="btn btn-primary">Till förbetalningen</a>
                </div>
            </div>
        </div>
    </div> 

    <div class="{stagger} carousel-item mb-4">
        <div class="card w-80 md:w-96 bg-base-100 text-primary-content drop-shadow">
            <div class="card-body">
                <h2 class="card-title">Discokort
                        <div class={`flex h-8 w-8 -rotate-45`}>
                            <span class="w-8 absolute text-center">🎟️</span>
                        </div>
                </h2>
                <div class="w-full">
                    <p class="">För köp i kiosken används Discokort</p>
                    
                    <p class="mt-2 font-thin"> 
                        Discokortetet är ett stämpelkort som går att ladda i förväg via förbetalning eller i entrén.
                    </p>
                    <p class="mt-4 font-thin">
                        Med discokortet behöver inte barnen bära runt på kontanter inne på discot utan de har istället sitt discokort som de i kiosken stämplar av när pengar används.
                    </p>
                    <p class="mt-4 font-thin">
                        Om du förbetalar får du discokortet i entrén
                    </p>
                </div>
            </div>
        </div>
    </div> 

    <div class="{stagger} carousel-item mb-4">
        <div class="card w-80 md:w-96 bg-base-100 text-primary-content drop-shadow">
            <div class="card-body">
              <h2 class="card-title">KIOSK 
                <div class="flex flex-col h-8 overflow-hidden">
                    <span bind:this={candyIn} xyz="origin-top fade up flip-up perspective-1 delay-4" class="xyz-in w-8 absolute text-center"></span>
                    <span bind:this={candyOut} xyz="origin-bottom fade down flip-down perspective-1" class="xyz-out w-8 absolute text-center"></span>
                </div>
              </h2>

              <div class="w-full">
                <p class="mt-2 font-thin"> 
                    I vår kiosk kan du köpa all snacks och dryck du kan vilja ha under discot
                    I kiosken används discokort för att betala, du kan läsa mer om det under rubriken, Discokort
                </p>
              </div>
            </div>
        </div>
    </div> 

    <div class="{stagger} carousel-item mb-4">
        <div class="card w-60 bg-base-100 drop-shadow">
            <figure class="px-10 pt-10">
            <img src="./StoraCoop.png" alt="Stora Coop" class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
            <h2 class="card-title">Tack!</h2>
            <p>Till Stora Coop Viberga som sponsrar kiosken</p>
            </div>
        </div>
    </div>


</div>