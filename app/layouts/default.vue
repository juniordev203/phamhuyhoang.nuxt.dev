<template>
  <div class="flex min-h-screen flex-col">
    <LayoutAppHeader />
    <main
      class="container-site w-full flex-grow pt-28 pb-section-mobile md:pb-section"
    >
      <slot />
    </main>
    <LayoutAppFooter />
  </div>
</template>
