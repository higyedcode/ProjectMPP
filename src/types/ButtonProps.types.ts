export type ButtonProps = {
    type: 'button' | 'submit' | 'reset' | undefined
    className?: string
    onclick?: () => void
    buttonMessage: string
}
