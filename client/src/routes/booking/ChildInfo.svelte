<script>
    import { Heading, P, A, Mark, Secondary, Button, Helper, Progressbar } from 'flowbite-svelte'
    import ChildModal from './ChildModal.svelte';
    
    export let children;
    export let currentStep;
    
    let addChild = () => {
        console.log( children)

        let id = (children[0]?children[0]['id']:-1) + 1


        children.unshift({id});
        children = children;
    
        document.getElementById("container").scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }
    let removeChild = (id) => {
        children = children.filter(function( child ) {
            return child.id !== id;
        });
    }

    let verifyData = () => {
        let isError = false;

        for(let i in children) {
            let child = children[i]
            children[i].errors = [];
            children = children;

            let errors = []
            if(child.name === "") errors.push("name");
            if(child.surname === "") errors.push("surname");
            if(child.money === "") errors.push("money");
            if(typeof child.isLagstadie === "undefined") errors.push("stadie");
            children[i].errors = errors;
            children = children;

            console.log("err", errors, errors.length != 0)
            if(errors.length != 0) isError = true;

        }

        if(isError == false) {
            currentStep = 1;
        }
    }
    
</script>

<Heading tag="h3" class="mx-10"></Heading>

{#each children as child (child.id)}
    <div class="m-8 p-4 bg-slate-50 rounded-lg shadow-lg animate-fallIn transition-all">
        <ChildModal {removeChild} bind:child={child}></ChildModal>
    </div>
{/each}


<div class="grid gap-3 pb-10 grid-cols-2 ">
    <div class="text-center">
        <Button on:click={addChild} name="addChild" pill={true} outline={true} class="!p-2" size="xl"><svg aria-hidden="true" class="w-5 h-5 text-center" fill="currentColor" viewBox="0 0 15.5 15.5" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" clip-rule="evenodd"></path></svg></Button>
        <Helper class="pt-2" for="addChild">Lägg till ett barn</Helper>
    </div>
    <div class="text-center">
        <Button on:click={verifyData} name="addChild" pill={true} outline={true} class="!p-2" size="xl"><svg aria-hidden="true" class="w-5 h-5 text-center" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></Button>
        <Helper class="pt-2" for="addChild">Nästa steg</Helper>
    </div>
</div>
    