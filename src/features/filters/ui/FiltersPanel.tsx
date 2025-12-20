import { StackTypeDropdown } from "./StackTypeField";
import { SkillsField } from "./SkillsField";
import { StrictToggle } from "./StrictSkillsToggle";
import { ClearButton } from "./ClearButton";

export function FiltersPanel() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StackTypeDropdown />
            <SkillsField />
            <div className="flex flex-col justify-end gap-2">
                <StrictToggle />
                <div className="space-x-2">
                    <ClearButton />
                </div>
            </div>
        </div>
    );
}
