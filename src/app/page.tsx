"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <header className="mb-16">
          <h1 className="mono-text text-4xl md:text-5xl font-bold text-black mb-4">
            ta3ls.dev
          </h1>
          <p className="mono-text text-lg text-gray-600">
            Blockchain Developer / Product Manager / Researcher
          </p>
        </header>

        {/* Profile JSON */}
        <section className="mb-16">
          <Card className="border border-gray-200 simple-hover">
            <CardContent className="p-8">
              <h2 className="mono-text text-xl text-black mb-6">
                $ cat profile.json
              </h2>
              <div className="mono-text text-sm text-gray-800 space-y-1 leading-relaxed">
                <div>{"{"}</div>
                <div className="ml-4">&quot;name&quot;: &quot;ta3ls&quot;,</div>
                <div className="ml-4">&quot;role&quot;: &quot;Full Stack Developer / Vibe Coder&quot;,</div>
                <div className="ml-4">&quot;education&quot;: &quot;Master of Computer Science&quot;,</div>
                <div className="ml-4">&quot;location&quot;: &quot;Auckland, New Zealand&quot;,</div>
                <div className="ml-4">&quot;experience&quot;: [</div>
                <div className="ml-8">&quot;Product Manager Intern &quot;,</div>
                <div className="ml-8">&quot;Blockchain Developer&quot;,</div>
                <div className="ml-8">&quot;Research Assistant&quot;</div>
                <div className="ml-4">],</div>
                <div className="ml-4">&quot;specialties&quot;: [&quot;DeFi&quot;, &quot;Smart Contracts&quot;, &quot;Product Design&quot;, &quot;Web3&quot;],</div>
                <div className="ml-4">&quot;status&quot;: &quot;Building the next generation of blockchain applications&quot;</div>
                <div>{"}"}</div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Skills JSON */}
        <section className="mb-16">
          <Card className="border border-gray-200 simple-hover">
            <CardContent className="p-8">
              <h2 className="mono-text text-xl text-black mb-6">
                $ cat skills.json
              </h2>
              <div className="mono-text text-sm text-gray-800 space-y-1 leading-relaxed">
                <div>{"{"}</div>
                <div className="ml-4">&quot;blockchain&quot;: {"{"}</div>
                <div className="ml-8">&quot;solidity&quot;: &quot;Advanced&quot;,</div>
                <div className="ml-8">&quot;web3&quot;: &quot;Advanced&quot;,</div>
                <div className="ml-8">&quot;defi&quot;: &quot;Intermediate+&quot;</div>
                <div className="ml-4">{"}"}, </div>
                <div className="ml-4">&quot;frontend&quot;: {"{"}</div>
                <div className="ml-8">&quot;react&quot;: &quot;Vibe Coder&quot;,</div>
                <div className="ml-8">&quot;typescript&quot;: &quot;Vibe Coder&quot;,</div>
                <div className="ml-8">&quot;nextjs&quot;: &quot;Vibe Coder+&quot;</div>
                <div className="ml-4">{"}"}, </div>
                <div className="ml-4">&quot;backend&quot;: {"{"}</div>
                <div className="ml-8">&quot;go&quot;: &quot;Vibe Coder++&quot;,</div>
                <div className="ml-8">&quot;nodejs&quot;: &quot;Vibe Coder+&quot;,</div>
                <div className="ml-8">&quot;python&quot;: &quot;Vibe Coder&quot;</div>
                <div className="ml-4">{"}"}</div>
                <div>{"}"}</div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Projects JSON */}
        <section className="mb-16">
          <Card className="border border-gray-200 simple-hover">
            <CardContent className="p-8">
              <h2 className="mono-text text-xl text-black mb-6">
                $ cat projects.json
              </h2>
              <div className="mono-text text-sm text-gray-800 space-y-1 leading-relaxed">
                <div>[</div>
                <div className="ml-4">{"{"}</div>
                <div className="ml-8">&quot;name&quot;: &quot;KiwiTrace&quot;,</div>
                <div className="ml-8">&quot;description&quot;: &quot;Blockchain Traceability BaaS Platform&quot;,</div>
                <div className="ml-8">&quot;tech&quot;: [&quot;Solidity&quot;, &quot;React&quot;, &quot;Golang&quot;],</div>
                <div className="ml-8">&quot;type&quot;: &quot;Lead Project&quot;</div>
                <div className="ml-4">{"}"}, </div>
                <div className="ml-4">{"{"}</div>
                <div className="ml-8">&quot;name&quot;: &quot;zk-SNARK User Authentication&quot;,</div>
                <div className="ml-8">&quot;description&quot;: &quot;Zero-Knowledge Proof User Credential System&quot;,</div>
                <div className="ml-8">&quot;tech&quot;: [&quot;Zero-Knowledge Proofs&quot;, &quot;Circom&quot;, &quot;Web3&quot;],</div>
                <div className="ml-8">&quot;type&quot;: &quot;Research Project&quot;</div>
                <div className="ml-4">{"}"}, </div>
                
                <div>]</div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact JSON */}
        <section className="mb-16">
          <Card className="border border-gray-200 simple-hover">
            <CardContent className="p-8">
              <h2 className="mono-text text-xl text-black mb-6">
                $ cat contact.json
              </h2>
              <div className="mono-text text-sm text-gray-800 space-y-1 leading-relaxed mb-6">
                <div>{"{"}</div>
                <div className="ml-4">&quot;telegram&quot;: &quot;@ta3ls&quot;,</div>
                <div className="ml-4">&quot;github&quot;: &quot;github.com/ta33ls&quot;,</div>
                <div className="ml-4">&quot;twitter&quot;: &quot;@0xta3ls&quot;</div>
                <div>{"}"}</div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button 
                  variant="outline" 
                  className="simple-hover border-gray-300 text-gray-700 hover:bg-gray-50"
                  asChild
                >
                  <a href="https://t.me/ta3ls" target="_blank" rel="noopener noreferrer">Telegram</a>
                </Button>
                <Button 
                  variant="outline" 
                  className="simple-hover border-gray-300 text-gray-700 hover:bg-gray-50"
                  asChild
                >
                  <a href="https://github.com/ta33ls" target="_blank" rel="noopener noreferrer">GitHub</a>
                </Button>
                <Button 
                  variant="outline" 
                  className="simple-hover border-gray-300 text-gray-700 hover:bg-gray-50"
                  asChild
                >
                  <a href="https://twitter.com/0xta3ls" target="_blank" rel="noopener noreferrer">Twitter</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Poetry Text */}
        <div className="relative mb-8 overflow-hidden h-8">
          <div className="flowing-text mono-text text-sm text-gray-400 italic absolute top-1/2 transform -translate-y-1/2">
            There are thirty-three love songs...
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center">
          <p className="mono-text text-sm text-gray-500">
            © 2025 ta3ls.dev
          </p>
        </footer>
      </div>
    </div>
  );
}
