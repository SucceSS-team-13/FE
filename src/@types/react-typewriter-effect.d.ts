declare module "react-typewriter-effect" {
  interface TypewriterProps {
    textStyle?: React.CSSProperties;
    startDelay?: number;
    cursorColor?: string;
    text?: string;
    typeSpeed?: number;
    eraseSpeed?: number;
    eraseDelay?: number;
    typingDelay?: number;
    multiText?: string[];
    multiTextDelay?: number;
    hideCursorAfterText?: boolean;
  }

  export default function Typewriter(props: TypewriterProps): JSX.Element;
}
