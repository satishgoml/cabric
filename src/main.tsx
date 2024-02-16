import React from "react"
import ReactDOM from "react-dom"

import { CabricEditor } from "."

import NewsletterTemplate from "@/assets/templates/newsletter.json"

const userFonts = [
  {
      "postscript_name": "VolvoBroad_UserFont",
      "url": "https://drallpyybfsueuxnipxi.supabase.co/storage/v1/object/sign/solarplexus/brand-guidelines-asset/b41adf67-f1f0-4a81-9d27-9bc8e389c414/fonts/VolvoBroad.ttf-1703173882435?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzb2xhcnBsZXh1cy9icmFuZC1ndWlkZWxpbmVzLWFzc2V0L2I0MWFkZjY3LWYxZjAtNGE4MS05ZDI3LTliYzhlMzg5YzQxNC9mb250cy9Wb2x2b0Jyb2FkLnR0Zi0xNzAzMTczODgyNDM1IiwiaWF0IjoxNzA3ODA3OTE0LCJleHAiOjIwMjMxNjc5MTR9.mXtXtXKQaviUox9n2VdsI_2NL7m1vCNI5-303_Bj5nE",
      "id": "font_512d3cffbe89449eafa26c3a",
      "name": "VolvoBroad_UserFont",
      "family": "VolvoBroad_UserFont"
  },
  {
      "postscript_name": "VolvoBroad_UserFont",
      "url": "https://drallpyybfsueuxnipxi.supabase.co/storage/v1/object/sign/solarplexus/brand-guidelines-asset/b41adf67-f1f0-4a81-9d27-9bc8e389c414/fonts/VolvoBroad.ttf-1706976706262?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzb2xhcnBsZXh1cy9icmFuZC1ndWlkZWxpbmVzLWFzc2V0L2I0MWFkZjY3LWYxZjAtNGE4MS05ZDI3LTliYzhlMzg5YzQxNC9mb250cy9Wb2x2b0Jyb2FkLnR0Zi0xNzA2OTc2NzA2MjYyIiwiaWF0IjoxNzA3ODA3OTE1LCJleHAiOjIwMjMxNjc5MTV9.Llo11xfsMIxyJ99nTUA5JNTZE2plN4uBqyxo3AsmZ70",
      "id": "font_e93f1038911e428fa0c95d26",
      "name": "VolvoBroad_UserFont",
      "family": "VolvoBroad_UserFont"
  },
  {
      "postscript_name": "VolvoBroad_UserFont",
      "url": "https://drallpyybfsueuxnipxi.supabase.co/storage/v1/object/sign/solarplexus/brand-guidelines-asset/b41adf67-f1f0-4a81-9d27-9bc8e389c414/fonts/VolvoBroad.ttf-1702630643414?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzb2xhcnBsZXh1cy9icmFuZC1ndWlkZWxpbmVzLWFzc2V0L2I0MWFkZjY3LWYxZjAtNGE4MS05ZDI3LTliYzhlMzg5YzQxNC9mb250cy9Wb2x2b0Jyb2FkLnR0Zi0xNzAyNjMwNjQzNDE0IiwiaWF0IjoxNzA3ODA3OTE1LCJleHAiOjIwMjMxNjc5MTV9.wWNvA0DkTLU6dSFD6Dd0zE05GAqwx8MPl7Ha9A6pQqE",
      "id": "font_145e24a7ddee46e5b202d947",
      "name": "VolvoBroad_UserFont",
      "family": "VolvoBroad_UserFont"
  },
  {
      "postscript_name": "VolvoBroad_UserFont",
      "url": "https://drallpyybfsueuxnipxi.supabase.co/storage/v1/object/sign/solarplexus/brand-guidelines-asset/b41adf67-f1f0-4a81-9d27-9bc8e389c414/fonts/VolvoBroad.ttf-1705072710142?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzb2xhcnBsZXh1cy9icmFuZC1ndWlkZWxpbmVzLWFzc2V0L2I0MWFkZjY3LWYxZjAtNGE4MS05ZDI3LTliYzhlMzg5YzQxNC9mb250cy9Wb2x2b0Jyb2FkLnR0Zi0xNzA1MDcyNzEwMTQyIiwiaWF0IjoxNzA3ODA3OTE1LCJleHAiOjIwMjMxNjc5MTV9.RPuMiFXIzU9mqLlrkPlr506KylljMcuh4x0BG9vIUmM",
      "id": "font_c902a29e0c2240f3818bda79",
      "name": "VolvoBroad_UserFont",
      "family": "VolvoBroad_UserFont"
  }
]

ReactDOM.render(
  <React.StrictMode>
    <CabricEditor 
      designState = { NewsletterTemplate }
      onSave = { (designState: any,
          image: any,
        ) => console.log(designState, image) }
      userFonts = { userFonts }
      applyContext = {{
        isApplyingToAll: true,
        applyToAllAssets: () => {
          console.log("Applying to all")
        },
      }}
      
    />
  </React.StrictMode>,
  document.getElementById("root")
)
