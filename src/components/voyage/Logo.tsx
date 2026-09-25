import Image from "next/image"

/**
 * Logo du site (monogramme SYB + « SolYB »), comme dans la navigation actuelle,
 * à la place du simple texte de la maquette. Le lien et sa cible sont fournis
 * par l'appelant.
 */
export default function Logo() {
  return (
    <>
      <Image className="logo-mark" src="/logo/syb-orange.png" alt="" width={160} height={160} priority />
      <span aria-hidden="true">
        Sol<b>YB</b>
      </span>
    </>
  )
}
