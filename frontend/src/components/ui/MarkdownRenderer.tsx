import { FC, HTMLAttributes } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import styles from "./MarkdownRenderer.module.css";

interface MarkdownRendererProps extends HTMLAttributes<HTMLDivElement> {
  content?: string;
}

const MarkdownRenderer: FC<MarkdownRendererProps> = ({ content, className, ...props }) => {
  return (
    <div className={`${styles["markdown-container"]} ${className}`} {...props}>
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        className={styles["markdown-body"]}
        components={{
          code({ node, className, children, style, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <SyntaxHighlighter style={dark} language={match[1]} PreTag="div" className={styles["markdown-code"]} {...props}>
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content ?? "# Note not founded!"}
      </Markdown>
    </div>
  );
};

export default MarkdownRenderer;
