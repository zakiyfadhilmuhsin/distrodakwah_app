<template>
	<div class="flex-container">
		<q-input
			outlined
			:disable="allowNotesEdit == false"
			v-model="notes"
			label="Catatan"
			class="btn-right"
			dense
		/>
		<q-btn
			flat
			size="md"
			class="bg-orange-8 text-white"
			v-if="allowNotesEdit == false"
			@click="allowNotesEdit = true"
			>Edit</q-btn
		>
		<q-btn
			flat
			size="md"
			class="bg-green-8 text-white"
			v-else
			@click="onNotesSubmit"
			>Simpan</q-btn
		>
	</div>
</template>

<script>
import { postToOrderUrl, getHeader } from "../../config";
export default {
	name: "Notes",
	props: {
        orderIdProp: Number,
        notesProp: String
	},
	data() {
		return {
            allowNotesEdit: false,
            notes: "",
		};
    },
    created() {
        this.notes = this.$props.notesProp
    },
	methods: {
		async onNotesSubmit() {
			let orderForm = new FormData();
			orderForm.append("_method", "PUT");
			orderForm.append("notes", this.notes);

			try {
				const updateNotesRes = await this.$axios.post(
					`${postToOrderUrl}/${this.$props.orderIdProp}/updateNotes`,
					orderForm,
					{ headers: getHeader() }
				);
				this.$q.notify({
					position: "top",
					color: "green-4",
					message: "Catatan Tersimpan",
					html: true
                });
                this.allowNotesEdit=false;
			} catch (error) {
				console.log("error updating Notes");
				this.$q.notify({
					position: "top",
					color: "red-4",
					message: "Error mengupdate catatan",
					html: true
				});
			}
		}
	}
};
</script>

<style></style>
