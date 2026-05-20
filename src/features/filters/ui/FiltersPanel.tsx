import { StackTypeField } from "./StackTypeField";
import { SkillsField } from "./SkillsField";
import { StrictToggle } from "./StrictSkillsToggle";
import { ClearButton } from "./ClearButton";
import { DateIntervalField } from "./DateIntervalField";

export function FiltersPanel() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StackTypeField />
            <SkillsField />
            <DateIntervalField />
            <div className="flex flex-col justify-end gap-2 md:col-span-3">
                <StrictToggle />
                <div className="space-x-2">
                    <ClearButton />
                </div>
            </div>
        </div>
    );
}
