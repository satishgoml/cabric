import React from "react"
import ReactDOM from "react-dom"

import { CabricEditor } from "."

import NewsletterTemplate from "@/assets/templates/newsletter.json"

ReactDOM.render(
  <React.StrictMode>
    <CabricEditor 
      designState = { NewsletterTemplate }
      onSave = { (designState: any) => console.log(designState) }
    />
  </React.StrictMode>,
  document.getElementById("root")
)
