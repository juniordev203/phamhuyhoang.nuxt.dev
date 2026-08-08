<template>
  <div class="flex min-h-screen flex-col">
    <div class="glass3d fixed inset-0 pointer-events-none" aria-hidden="true" />
    <a
      href="#main-content"
      class="relative z-10 sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:border focus:border-primary focus:bg-background focus:px-4 focus:py-2 focus:text-label focus:text-primary"
    >
      Skip to content
    </a>
    <div class="relative z-10 flex flex-grow flex-col">
      <LayoutAppHeader />
      <main
        id="main-content"
        tabindex="-1"
        class="container-site w-full flex-grow pt-28 pb-section-mobile md:pb-section outline-none"
      >
        <slot />
      </main>
      <LayoutAppFooter />
    </div>
  </div>
</template>
