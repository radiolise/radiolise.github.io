<template>
  <div
    ref="station-row"
    class="station-row"
    :class="{ dragging, playing, transition }"
    :style="{ transform: dragging ? `translateY(${currentTranslate}px)` : '' }"
    @click="handleClick()"
    @mousedown.left="handleMouseDown"
  >
    <div>
      <rad-icon :station="station" />
    </div>
    <div>
      <div style="display: block; padding-bottom: 20px">
        <div>
          <h4 style="font-weight: bold; display: inline">
            {{ station.name }}
          </h4>
        </div>
      </div>
      <div style="overflow: hidden; height: 30px">
        <div style="overflow: scroll hidden; width: 100%">
          <div style="white-space: nowrap; height: 30px">
            <rad-tags :labels="labels" />
          </div>
        </div>
      </div>
    </div>
    <div style="padding: 0 15px 0 0" @click.stop @mousedown.stop>
      <rad-dropdown
        :actions="[$t('general.cancel')]"
        :label="$t('station.options', [station.name])"
        :data="menuOptions"
        flex-align
        @change="trigger"
      >
        <font-awesome-icon icon="ellipsis-v" fixed-width />
      </rad-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Mixins } from "vue-property-decorator";
import { State, Getter, Action } from "vuex-class";

import RadDropdown from "./RadDropdown.vue";
import RadIcon from "./RadIcon.vue";
import RadTags from "./RadTags.vue";
import DragHelper from "@/mixins/DragHelper";

@Component({
  components: {
    RadDropdown,
    RadIcon,
    RadTags,
  },
})
export default class RadStation extends Mixins(DragHelper) {
  @Prop({ type: Object, required: true }) readonly station!: Station;

  @Ref() readonly menu!: HTMLSelectElement;

  @State readonly editing?: Station;

  @Getter readonly currentStation?: Station;
  @Getter readonly selectedList!: number;

  @Action("removeStation") handleDelete!: (index: number) => Promise<void>;
  @Action likeStation!: (id: string) => Promise<void>;
  @Action toggleStation!: (station: Station) => Promise<void>;

  get transition(): boolean {
    return !this.dragging && this.sortIndex !== undefined;
  }

  get labels(): string[] {
    return [
      this.station.country,
      this.station.state,
      ...this.station.tags.split(","),
    ];
  }

  get menuOptions(): DropdownOption[] {
    const options = [
      { id: "like", name: this.$t("general.like.submit") as string },
      { id: "visitHomepage", name: this.$t("general.visitHomepage") as string },
      { id: "edit", name: this.$t("station.edit") as string },
    ];

    if (this.index > 0) {
      options.push({ id: "moveUp", name: this.$t("station.moveUp") as string });
    }

    if (this.index < this.currentList.length - 1) {
      options.push({
        id: "moveDown",
        name: this.$t("station.moveDown") as string,
      });
    }

    options.push({ id: "delete", name: this.$t("station.delete") as string });
    return options;
  }

  get playing(): boolean {
    if (this.currentStation === undefined) {
      return false;
    }

    return this.currentStation.id === this.station.id;
  }

  handleClick(): void {
    this.finishSorting();
    this.toggleStation(this.station);
  }

  visitHomepage(): void {
    window.open(this.station.homepage, "_blank");
  }

  edit(): void {
    const newLocation = {
      path: "/editor",
      query: {
        list: String(this.selectedList),
        id: this.station.id,
      },
    };

    const otherRouteActive =
      this.$route.path !== "/editor" ||
      this.$route.query.list !== newLocation.query.list ||
      this.$route.query.id !== newLocation.query.id;

    if (otherRouteActive) {
      this.$router.push(newLocation);
    }
  }

  moveUp(): void {
    this.moveStation({ index: this.index, newIndex: this.index - 1 });
  }

  moveDown(): void {
    this.moveStation({ index: this.index, newIndex: this.index + 1 });
  }

  delete(index = this.index): void {
    if (this.editing === this.station) {
      this.$router.replace("/");
    }

    this.handleDelete(index);
  }

  trigger(option: string): void {
    switch (option) {
      case "like":
        this.likeStation(this.station.id);
        break;
      case "visitHomepage":
        this.visitHomepage();
        break;
      case "edit":
        this.edit();
        break;
      case "moveUp":
        this.moveUp();
        break;
      case "moveDown":
        this.moveDown();
        break;
      case "delete":
        this.delete();
        break;
      default:
        throw new Error(`Unknown option '${option}'.`);
    }
  }
}
</script>

<style scoped>
.station-row {
  cursor: pointer;
  display: table;
  transition: background 0.2s;
}
.station-row:hover {
  background: rgba(0, 0, 0, 0.1);
}
.station-row > div {
  display: table-cell;
}
.station-row > :first-child {
  padding: 20px 0;
  vertical-align: top;
}
.station-row > :nth-child(2) {
  text-align: left;
  width: 100%;
  max-width: 0;
  padding: 20px 0;
}
.station-row > :last-child {
  cursor: auto;
  vertical-align: middle;
}
.dragging {
  position: relative;
  z-index: 10;
  opacity: 0.8;
}
.transition {
  transition: transform 0.3s;
}
</style>
