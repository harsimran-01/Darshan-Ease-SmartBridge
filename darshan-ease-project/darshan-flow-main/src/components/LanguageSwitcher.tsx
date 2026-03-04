import { useLanguage } from "@/i18n/LanguageContext";
import { Language, languageLabels } from "@/i18n/translations";
import { Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <Select value={language} onValueChange={(v) => setLanguage(v as Language)}>
      <SelectTrigger className="w-auto gap-1.5 border-border bg-card text-sm h-9 px-3">
        <Globe className="h-4 w-4 text-muted-foreground" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {(Object.keys(languageLabels) as Language[]).map((lang) => (
          <SelectItem key={lang} value={lang}>
            {languageLabels[lang]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;
