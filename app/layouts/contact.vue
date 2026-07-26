<template>
  <div class="flex min-h-screen flex-col">
    <LayoutAppHeader />
    <main
      class="container-site flex w-full flex-grow flex-col items-center justify-center pt-28 pb-section-mobile md:pb-section"
    >
      <slot />
    </main>
    <LayoutAppFooter variant="contact" />
  </div>
</template>
