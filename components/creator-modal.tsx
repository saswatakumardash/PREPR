"use client"

import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ExternalLink, Mail, MessageCircle } from "lucide-react"

interface CreatorModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreatorModal({ open, onOpenChange }: CreatorModalProps) {
  const handlePortfolioRedirect = () => {
    window.open("https://skds.site", "_blank")
  }

  const handleEmailContact = () => {
    window.open("mailto:saswatdash577@gmail.com", "_blank")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">About the Creator</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pb-4">
          {/* Creator Photo and Info */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-36 h-36 rounded-full overflow-hidden ring-4 ring-blue-500/20 shadow-lg">
                <Image
                  src="/creator-photo.jpeg"
                  alt="Saswata Kumar Dash"
                  width={144}
                  height={144}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2">
                <Image src="/logo-512.png" alt="SKD Logo" width={40} height={40} className="object-contain" />
              </div>
            </div>

            <div className="text-center md:text-left flex-1">
              <h3 className="text-2xl font-bold">Saswata Kumar Dash</h3>
              <p className="text-lg text-blue-600 dark:text-blue-400 font-medium">
                AI Research Engineer & Full Stack Developer
              </p>
              <p className="text-muted-foreground mt-2 leading-relaxed">
                Computer Science Engineering student at VIT Chennai with expertise in AI research and development.
                Published IEEE research paper on Multi-Lingual OCR systems and experienced in building AI-powered
                applications.
              </p>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-semibold mb-3">Professional Summary</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                🎓 <strong>Education:</strong> B.Tech CSE (Cyber-Physical Systems) at VIT Chennai
              </p>
              <p>
                🔬 <strong>Research:</strong> AI Research Intern at Tomas Bata University, Czech Republic
              </p>
              <p>
                📄 <strong>Publications:</strong> IEEE Xplore research paper on Multi-Lingual Handwritten Recognition
              </p>
              <p>
                💼 <strong>Experience:</strong> AI in Biotech Intern at Teralumen Solutions
              </p>
              <p>
                🛠️ <strong>Skills:</strong> Python, AI/ML, Deep Learning, React, Next.js, PyTorch, TensorFlow
              </p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-lg">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Any Doubts? Contact Me
            </h4>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={handleEmailContact} variant="outline" size="sm" className="gap-2">
                <Mail className="h-4 w-4" />
                Email Me
              </Button>
              <Button onClick={handlePortfolioRedirect} variant="outline" size="sm" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                Visit Portfolio
              </Button>
            </div>
          </div>

          {/* Redirect to Portfolio */}
          <div className="text-center">
            <Button
              onClick={handlePortfolioRedirect}
              className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <ExternalLink className="h-4 w-4" />
              Visit Full Portfolio & Resume
            </Button>
            <p className="text-sm text-muted-foreground mt-2">For detailed information, projects, and contact</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
