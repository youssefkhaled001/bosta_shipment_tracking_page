import { useLanguage } from "./contexts/LanguageContext"

function App() {
  const {language} = useLanguage();
    return (
    <div className="font-rubik w-full h-full">
      {language}
    </div>
  )
}

export default App
