import { formatTimestamp } from "@/lib/formatTimestamp";
import type { Post } from "@/types/post";
import type { FC } from "react";

type PostThreadProps = {
  post: Post;
  index: number;
};

export const PostThread: FC<PostThreadProps> = ({ post, index }) => {
  return (
    <article className="border-2 border-foreground bg-card text-card-foreground">
      <header className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b-2 border-foreground bg-secondary px-4 py-2">
        <span className="font-display text-[10px] uppercase tracking-widest text-accent">
          &gt;&gt;
        </span>
        <span className="font-mono text-base font-bold">
          {post.profile.name}
        </span>
        <span className="font-mono text-sm text-muted-foreground">
          @ {formatTimestamp(post.created_at)}
        </span>
        <span className="ml-auto font-display text-[10px] uppercase tracking-widest text-muted-foreground">
          #{String(index + 1).padStart(3, "0")}
        </span>
      </header>
      <div className="px-4 py-4">
        <p className="whitespace-pre-wrap break-words font-mono text-lg leading-relaxed">
          {post.content}
        </p>
      </div>
    </article>
  );
};
