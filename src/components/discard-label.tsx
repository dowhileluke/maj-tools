import { ReactNode } from 'react'

type DiscardLabelProps = {
    shanten: number;
    children: ReactNode;
}

function named(shanten: number) {
    if (shanten === -1) return 'Complete'
    if (shanten === 0) return 'Tenpai'

    return `${shanten}-shanten`
}

export function DiscardLabel({ shanten, children }: DiscardLabelProps) {
    return (
        <div className="flex-center flex-col gap-4">
            <div className="text-center">
                {named(shanten)}
            </div>
            {children}
        </div>
    )
}
