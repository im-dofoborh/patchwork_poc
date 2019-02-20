<template>
  <div class="sg-sample-grid">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
  .sg-sample-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-column-gap: spacing-unit(xs);
    grid-row-gap: spacing-unit(md);

    & > * {
      text-align: center;
      background: $color--background--light;
      border-radius: 3px;
      padding: spacing-unit(sm);
    }
  }
</style>
