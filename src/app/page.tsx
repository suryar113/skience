import Image from 'next/image';
import {
  File,
  Heading1,
  Image as ImageIcon,
  LayoutTemplate,
  Monitor,
  Palette,
  PanelLeft,
  PanelTop,
  Plus,
  RectangleHorizontal,
  Settings,
  Smartphone,
  StretchHorizontal,
  Tablet,
  Type,
} from 'lucide-react';

import { SiteHeader } from '@/components/site-header';
import {
  Sidebar,
  SidebarProvider,
  SidebarInset,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Separator } from '@/components/ui/separator';

const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-abstract');
const featureImage1 = PlaceHolderImages.find((img) => img.id === 'feature-1');
const featureImage2 = PlaceHolderImages.find((img) => img.id === 'feature-2');
const featureImage3 = PlaceHolderImages.find((img) => img.id === 'feature-3');


type BuildElementProps = {
  icon: React.ElementType;
  name: string;
};

function BuildElement({ icon: Icon, name }: BuildElementProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-2 rounded-lg bg-card hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing border">
      <Icon className="w-7 h-7 mb-2 text-primary-foreground/80 bg-primary/90 p-1 rounded-md" />
      <p className="text-xs font-medium text-foreground">{name}</p>
    </div>
  );
}

export default function Home() {
  return (
    <SidebarProvider>
      <SiteHeader />
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Editor</h2>
                <PanelLeft className="h-5 w-5 opacity-50"/>
            </div>
          </SidebarHeader>
          <SidebarContent className="p-0">
            <Tabs defaultValue="build" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-transparent p-2">
                <TabsTrigger value="build">
                  <Plus className="h-4 w-4 mr-1.5" />
                  Build
                </TabsTrigger>
                <TabsTrigger value="pages">
                  <File className="h-4 w-4 mr-1.5" />
                  Pages
                </TabsTrigger>
                <TabsTrigger value="settings">
                  <Settings className="h-4 w-4 mr-1.5" />
                  Settings
                </TabsTrigger>
              </TabsList>
              <Separator />
              <TabsContent value="build" className="p-2">
                <div className="grid grid-cols-2 gap-2">
                  <BuildElement icon={LayoutTemplate} name="Section" />
                  <BuildElement icon={Heading1} name="Title" />
                  <BuildElement icon={Type} name="Text" />
                  <BuildElement icon={ImageIcon} name="Image" />
                  <BuildElement icon={RectangleHorizontal} name="Button" />
                  <BuildElement icon={StretchHorizontal} name="Spacer" />
                </div>
              </TabsContent>
              <TabsContent value="pages" className="p-2">
                <div className="flex flex-col gap-2">
                  <Button variant="ghost" className="justify-start">Home</Button>
                  <Button variant="ghost" className="justify-start">About</Button>
                  <Button variant="ghost" className="justify-start">Contact</Button>
                  <Button variant="outline" className="mt-4"><Plus className="h-4 w-4 mr-2"/> Add Page</Button>
                </div>
              </TabsContent>
              <TabsContent value="settings" className="p-2">
                 <div className="flex flex-col gap-4 p-2">
                    <h3 className="text-sm font-medium">Theme</h3>
                    <Button variant="outline">
                        <Palette className="h-4 w-4 mr-2"/>
                        Change Theme
                    </Button>
                    <h3 className="text-sm font-medium">Custom Code</h3>
                     <Button variant="outline">
                        Edit CSS/JS
                    </Button>
                 </div>
              </TabsContent>
            </Tabs>
          </SidebarContent>
        </Sidebar>

        <SidebarInset>
          <main className="bg-white flex-1 p-4 md:p-8 overflow-y-auto shadow-inner">
            <div className="max-w-7xl mx-auto">
              {/* Hero Section */}
              <section className="text-center rounded-xl bg-card border shadow-sm overflow-hidden">
                <div className="relative h-64 md:h-96">
                  {heroImage && (
                    <Image
                      src={heroImage.imageUrl}
                      alt={heroImage.description}
                      data-ai-hint={heroImage.imageHint}
                      fill
                      className="object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center p-4">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-headline">Modern & Clean Design</h1>
                    <p className="text-lg md:text-xl text-white/90 max-w-2xl">
                      Create a stunning website with our intuitive drag-and-drop builder.
                    </p>
                  </div>
                </div>
              </section>

              {/* Features Section */}
              <section className="py-12 md:py-20">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground font-headline">Core Features</h2>
                  <p className="text-muted-foreground mt-2 text-lg">Everything you need to build a professional online presence.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  <Card>
                    {featureImage1 && <Image src={featureImage1.imageUrl} alt={featureImage1.description} data-ai-hint={featureImage1.imageHint} width={600} height={400} className="rounded-t-lg aspect-[3/2] object-cover" />}
                    <CardHeader>
                      <CardTitle>Easy to Customize</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">Personalize every element to match your brand. No coding required.</p>
                    </CardContent>
                  </Card>
                  <Card>
                    {featureImage2 && <Image src={featureImage2.imageUrl} alt={featureImage2.description} data-ai-hint={featureImage2.imageHint} width={600} height={400} className="rounded-t-lg aspect-[3/2] object-cover" />}
                    <CardHeader>
                      <CardTitle>Fully Responsive</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">Your site will look perfect on desktops, tablets, and smartphones.</p>
                    </CardContent>
                  </Card>
                  <Card>
                    {featureImage3 && <Image src={featureImage3.imageUrl} alt={featureImage3.description} data-ai-hint={featureImage3.imageHint} width={600} height={400} className="rounded-t-lg aspect-[3/2] object-cover" />}
                    <CardHeader>
                      <CardTitle>Blazing Fast</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">Optimized for performance to ensure a great user experience.</p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* CTA Section */}
              <section className="py-12 md:py-20">
                <div className="bg-card rounded-xl p-8 md:p-16 border shadow-sm text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground font-headline">Ready to Get Started?</h2>
                    <p className="text-muted-foreground mt-4 mb-8 text-lg max-w-2xl mx-auto">Launch your new website in minutes. It's free to start.</p>
                    <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                        Start Building Now
                    </Button>
                </div>
              </section>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
