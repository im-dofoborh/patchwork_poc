<template>
  <div
    :style="`width: ${width}px;`"
    class="sg-mock-grid container">

    <div
      v-if="fluidText.length && fixedText.length"
      class="sg-mock-grid__row row">
      <div class="sg-mock-grid__rail-container">
        <div class="sg-mock-grid__rail sg-mock-grid__rail--primary">
          <div class="sg-mock-grid__column">
            {{ fluidText }}
          </div>
        </div>
        <div class="sg-mock-grid__rail sg-mock-grid__rail--secondary">
          <div class="sg-mock-grid__column sg-mock-grid__column--rail">
            {{ fixedText }}
          </div>
        </div>
      </div>
    </div>

    <div
      v-for="i in fluidBreakpointKeys"
      v-else
      :key="i"
      class="sg-mock-grid__row row">
      <div
        v-for="j in i"
        :key="`${i}-${j}`"
        :class="`col-${fluidBreakpoints[i]}`">
        <div class="sg-mock-grid__column" />
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    props: {
      width: {
        type: [ Number, String ],
        required: true
      },
      columns: {
        type: [ Number, String ],
        default: 12,
      },
      fluidText: {
        type: String,
        default: '',
      },
      fixedText: {
        type: String,
        default: '',
      },
    },

    computed: {
      fluidBreakpoints() {
        const nColumns = parseInt(this.columns, 10);
        const breakpoints = {
          1: nColumns,
          2: nColumns - 6,
          3: nColumns - 8,
          4: nColumns - 9,
          6: nColumns - 10,
          12: nColumns - 11,
        };
        Object.keys(breakpoints).forEach((key) => {
          if (breakpoints[key] < 1) {
            delete breakpoints[key];
          }
        });
        return breakpoints;
      },

      fluidBreakpointKeys() {
        const ints = Object.keys(this.fluidBreakpoints).map(i => parseInt(i, 10));
        return ints.sort((a, b) => a - b);
      },
    }
  }
</script>

<style lang="scss" scoped>
  .sg-mock-grid {
    background: rgba($color--highlight--regular, .05);
    border: 1px solid $color--background--dark;
    margin: spacing-unit(md) 0 0;

    &__row {
      margin-top: spacing-unit(sm);
      margin-bottom: spacing-unit(sm);
    }

    &__column {
      background: rgba($color--highlight--regular, .3);
      height: 35px;
      display: flex;
      align-items: center;
      justify-content: center;

      &--rail {
        background: $color--background--extra-dark;
      }
    }

    &__rail {
      float: left;

      &--primary {
        width: calc(100% - 300px - #{spacing-unit(md)});
        padding-left: 10px;
      }

      &--secondary {
        margin-left: spacing-unit(md);
        width: 300px;
        padding-right: 10px;
      }
    }

    &__rail-container {
      width: 100%;
    }
  }
</style>