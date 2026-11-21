import { ProsePage } from "@/components/content/ProsePage";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How CuteLoader handles data: no accounts, favorites stored only in your browser, and analytics or ads loaded only with your consent.",
  path: "/privacy/",
});

export default function PrivacyPage() {
  return (
    <ProsePage title="Privacy policy" path="/privacy/" lead={`Effective ${SITE.launchDate}. Short version: we collect as little as possible.`}>
      <h2>No accounts, no profiles</h2>
      <p>
        You can browse, customize, copy and download every loader without signing up. We don&apos;t ask for your name or
        email to use the site.
      </p>
      <h2>Stored in your browser only</h2>
      <p>
        Your theme choice, favorites and cookie preference are saved in your browser&apos;s local storage so the site
        remembers them. This data never leaves your device, and clearing your browser data removes it.
      </p>
      <h2>Analytics and advertising (only with consent)</h2>
      <p>
        If the site operator enables Google Analytics 4 or Google AdSense, a banner asks for your permission first. Nothing
        from Google is loaded until you click “Accept”. If you accept, Google may set cookies and process data such as your
        IP address and device information according to{" "}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
          Google&apos;s privacy policy
        </a>
        . The events we record are about product usage, such as which loader was customized or which export format was
        copied. They never include what you type. You can change your choice anytime with “Cookie settings” in the footer.
      </p>
      <h2>Showcase submissions</h2>
      <p>
        If you submit a project to the showcase, the form opens a pre-filled issue on GitHub that you choose to submit
        yourself. That submission is governed by GitHub&apos;s terms and privacy policy. Approved entries show only the
        project name, description and links you provided.
      </p>
      <h2>Hosting logs</h2>
      <p>
        Like any website, our hosting provider may keep standard server logs (such as IP address, time and requested page)
        for security and reliability, retained according to the provider&apos;s policy.
      </p>
      <h2>Changes and contact</h2>
      <p>
        If this policy changes, we&apos;ll update the date above. For questions, contact the site operator through the
        channels listed on the About page.
      </p>
    </ProsePage>
  );
}
