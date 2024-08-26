import {Badge} from "@/components/ui/badge";

interface BadgesProps {
  badges?: string[]
  className?: string
}

export const Badges: React.FC<BadgesProps> = (props) => {
  return (
    <>
      {props.badges?.length ? (
          <div className={`${props.className}`}>
            {props.badges.map((badge: string, index: number) => (
              <Badge className={"mr-1"} key={index}>{badge}</Badge>
            ))}
          </div>
        ) : null}
    </>
  );
}