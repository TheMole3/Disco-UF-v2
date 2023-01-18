<script>
    import { Button, Modal, P } from 'flowbite-svelte'
    export let open;
</script>

<Modal title="Integritetspolicy" bind:open={open} xl autoclose>
    <P>Disco Melo</P>
    <P>Disco Melo samlar in data från bokningar. Denna data samlas in:<br>
    Namn<br>
    Telefonnummer<br>
    Årskurs<br>
    </P>
    <P>Denna data används för hemsidans funktionalitet.<br>
    All identifierbar data tas bort 2 månader efter bokningens datum har passerat<br>
    </P>
    <P>Du samtycker till att denna data samlas in genom att använda tjänsten</P>
    <P>
    Denna webplats använder funktionella kakor (cookies), de flesta webläsare tar automatiskt emot cookies.<br>
    Men du kan, om du vill, slå av detta. Då kan dock hemsidans funktionalitet begränsas och du kanske inte kommer åt alla funktioner.<br>
    </P>
    <P>
    Denna webplats delar inte din data vidare till trejde part i analys-, beteende- eller marknadförsingssyfte
    </P>
    <P>
    Kontakt:<br>
    Hugo Arnlund<br>
    Epost:&emsp;&ensp;hugo@melo.se<br>
    Telefon:&ensp; 072 051 62 23
    </P>
</Modal>