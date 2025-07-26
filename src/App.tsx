import { AIAssistantWidget } from "@/components/AIAssistantWidget";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { MobileFloatingDock } from "@/components/layout/MobileFloatingDock";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AIModels from "./pages/AIModels";
import ArtistDetail from "./pages/ArtistDetail";
import Artists from "./pages/Artists";
import Auth from "./pages/Auth";
import CategoryFilter from "./pages/CategoryFilter";
import Community from "./pages/Community";
import Contact from "./pages/Contact";
import CookiePolicy from "./pages/CookiePolicy";
import CreateMusicPrompt from "./pages/CreateMusicPrompt";
import Dashboard from "./pages/Dashboard";
import Documentation from "./pages/Documentation";
import Explore from "./pages/Explore";
import HelpCenter from "./pages/HelpCenter";
import Index from "./pages/Index";
import Labs from "./pages/Labs";
import LocalAI from "./pages/LocalAI";
import ModelDetail from "./pages/ModelDetail";
import MusicPrompts from "./pages/MusicPrompts";
import MusicStudio from "./pages/MusicStudio";
import NotFound from "./pages/NotFound";
import Pricing from "./pages/Pricing";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import PromptDetail from "./pages/PromptDetail";
import SignOut from "./pages/SignOut";
import TermsOfService from "./pages/TermsOfService";
import TitleEffectsDemo from "./pages/TitleEffectsDemo";
import UserProfile from "./pages/UserProfile";
import WorkflowDetail from "./pages/WorkflowDetail";
import AdminArtists from "./pages/admin/Artists";
import CodeDevelopment from "./pages/explore/CodeDevelopment";
import MusicAudio from "./pages/explore/MusicAudio";
import TextWriting from "./pages/explore/TextWriting";
import VisualArt from "./pages/explore/VisualArt";
import AIModelsHub from "./pages/lab/AIModelsHub";
import AudioCreation from "./pages/lab/AudioCreation";
import CodeGeneration from "./pages/lab/CodeGeneration";
import ComfyUIWorkflows from "./pages/lab/ComfyUIWorkflows";
import CreativePacks from "./pages/lab/CreativePacks";
import ImageGeneration from "./pages/lab/ImageGeneration";
import InstallationGuide from "./pages/lab/InstallationGuide";
import VideoProcessing from "./pages/lab/VideoProcessing";
import CodePrompts from "./pages/prompts/CodePrompts";
import ImagePrompts from "./pages/prompts/ImagePrompts";
import TextPrompts from "./pages/prompts/TextPrompts";
import ModelUpload from "./pages/upload/ModelUpload";
import PackUpload from "./pages/upload/PackUpload";
import WorkflowUpload from "./pages/upload/WorkflowUpload";
import ComfyUIPortraitGenerator from "./pages/workflow/ComfyUIPortraitGenerator";
import MusicProductionChain from "./pages/workflow/MusicProductionChain";
import VideoUpscalingPipeline from "./pages/workflow/VideoUpscalingPipeline";

const queryClient = new QueryClient();

const App = () => (
    <div className="dark min-h-screen bg-background text-foreground">
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/pricing" element={<Pricing />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/help" element={<HelpCenter />} />
                        <Route path="/docs" element={<Documentation />} />
                        <Route path="/community" element={<Community />} />
                        <Route path="/prompts/image" element={<ImagePrompts />} />
                        <Route path="/prompts/code" element={<CodePrompts />} />
                        <Route path="/prompts/text" element={<TextPrompts />} />
                        <Route path="/auth/*" element={<Auth />} />
                        <Route path="/sign-out" element={<SignOut />} />
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute message="Please log in to access your dashboard">
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/dashboard/*"
                            element={
                                <ProtectedRoute message="Please log in to access your dashboard">
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/lab" element={<Labs />} />
                        <Route path="/labs" element={<Labs />} />
                        <Route path="/lab/image-generation" element={<ImageGeneration />} />
                        <Route path="/lab/video-processing" element={<VideoProcessing />} />
                        <Route path="/lab/audio-creation" element={<AudioCreation />} />
                        <Route path="/lab/code-generation" element={<CodeGeneration />} />
                        <Route path="/lab/workflows" element={<ComfyUIWorkflows />} />
                        <Route path="/lab/packs" element={<CreativePacks />} />
                        <Route path="/lab/models" element={<AIModelsHub />} />
                        <Route path="/lab/local-ai" element={<LocalAI />} />
                        <Route path="/lab/install" element={<InstallationGuide />} />
                        <Route path="/explore" element={<Explore />} />
                        <Route path="/explore/music-audio" element={<MusicAudio />} />
                        <Route path="/explore/visual-art" element={<VisualArt />} />
                        <Route path="/explore/code-development" element={<CodeDevelopment />} />
                        <Route path="/explore/text-writing" element={<TextWriting />} />
                        <Route
                            path="/admin/artists"
                            element={
                                <ProtectedRoute message="Please log in to access admin features">
                                    <AdminArtists />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/upload/workflow"
                            element={
                                <ProtectedRoute message="Please log in to upload workflows">
                                    <WorkflowUpload />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/upload/model"
                            element={
                                <ProtectedRoute message="Please log in to upload models">
                                    <ModelUpload />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/upload/pack"
                            element={
                                <ProtectedRoute message="Please log in to create packs">
                                    <PackUpload />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/artists" element={<Artists />} />
                        <Route path="/category/:slug" element={<CategoryFilter />} />
                        <Route path="/prompt/:slug" element={<PromptDetail />} />
                        <Route path="/prompt/:slug/purchase" element={<PromptDetail />} />
                        <Route path="/artist/:slug" element={<ArtistDetail />} />
                        <Route path="/workflow/:slug" element={<WorkflowDetail />} />
                        <Route path="/workflow/comfyui-portrait-generator" element={<ComfyUIPortraitGenerator />} />
                        <Route path="/workflow/music-production-chain" element={<MusicProductionChain />} />
                        <Route path="/workflow/video-upscaling-pipeline" element={<VideoUpscalingPipeline />} />
                        <Route path="/model/:slug" element={<ModelDetail />} />
                        <Route path="/ai-models" element={<AIModels />} />
                        <Route path="/music-prompts" element={<MusicPrompts />} />
                        <Route path="/music-studio" element={<MusicStudio />} />
                        <Route path="/create-music-prompt" element={<CreateMusicPrompt />} />
                        <Route path="/privacy" element={<PrivacyPolicy />} />
                        <Route path="/terms" element={<TermsOfService />} />
                        <Route path="/cookies" element={<CookiePolicy />} />
                        <Route path="/title-effects-demo" element={<TitleEffectsDemo />} />
                        <Route path="/:username" element={<UserProfile />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    <MobileFloatingDock />
                    <AIAssistantWidget />
                </BrowserRouter>
            </TooltipProvider>
        </QueryClientProvider>
    </div>
);

export default App;
