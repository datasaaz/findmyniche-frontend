import { useEffect, useState } from "react"
import { getIdToken } from "../firebase"
// import { getAppCheckToken } from "../firebase"
import { motion } from 'motion/react';
const logo = "/logo.png";

export default function App() {
  const [apiStatus, setApiStatus] = useState<"online" | "offline" | "loading">("loading")
  const [apiResponse, setApiResponse] = useState<any>(null)

  async function checkApi() {
    try {
      setApiStatus("loading")

      const idToken = await getIdToken()
      // const appCheckToken = await getAppCheckToken()

      const res = await fetch("https://api.findmynicheapp.com/private/me", {
        headers: {
          Authorization: `Bearer ${idToken}`,
          // "X-Firebase-AppCheck": appCheckToken
        }
      })

      const data = await res.json()
      setApiResponse(data)

      if (res.ok) {
        setApiStatus("online")
      } else {
        setApiStatus("offline")
      }
    } catch (err) {
      console.error("API check failed:", err)
      setApiStatus("offline")
      setApiResponse({ error: "Request failed" })
    }
  }
  useEffect(() => {
    checkApi()
  }, [])
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-950/20 via-black to-blue-950/20" />
      
      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-[0.02]" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' /%3E%3C/svg%3E")' }} 
      />

      {/* Content container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Logo */}
        <motion.header 
          className="pt-8 px-6 md:pt-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="max-w-7xl mx-auto text-center">
            {/* Replace this with your logo image */}
            <img 
              src={logo} 
              alt="FindMyNiche Logo"
              className="h-12 md:h-16 mx-auto"
            />
          </div>
        </motion.header>

        {/* Main content */}
        <main className="flex-1 flex items-center justify-center px-6 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-8 md:space-y-12">
            {/* Main headline */}
            <motion.h2 
              className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              Discover what
              <br />
              <span className="font-normal bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                others haven't found
              </span>
            </motion.h2>

            {/* Sub-text */}
            <motion.p 
              className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              Intelligence meets intuition. Uncover profitable niches before the market does.
            </motion.p>

            {/* Coming Soon */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              <h3 className="text-2xl md:text-3xl font-light tracking-widest text-transparent bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text">
                COMING SOON
              </h3>
            </motion.div>

            {/* Status indicator */}
            <motion.div 
              className="flex items-center justify-center gap-3 text-sm text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            >
              <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse" />
              <span className="font-light tracking-wide">In Development</span>
            </motion.div>
          </div>
        </main>

        {/* Footer */}
        <motion.footer 
          className="pb-8 px-6 md:pb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
        >
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-sm text-gray-600 font-light">
              © 2026 FindMyNiche · API Status:{" "}
              <span
                className={
                  apiStatus === "online"
                    ? "text-green-400"
                    : apiStatus === "offline"
                    ? "text-red-400"
                    : "text-yellow-400"
                }
              >
                {apiStatus.toUpperCase()}
              </span>

              {apiResponse && (
                <pre className="mt-2 text-xs text-gray-400 text-left max-w-xl mx-auto overflow-x-auto">
                  {JSON.stringify(apiResponse, null, 2)}
                </pre>
              )}
            </p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}