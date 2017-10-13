<template>
    <div id="zk-inlinetrainer-informed-consent">
        <h1 class="h4">Welcome!</h1>
        <p>This tool is designed to help you learn how to better use LATTE.</p>
        <p>Before you use the trainer, please read through and accept the following informed consent:</p>
        <hr>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolor dolore earum minus necessitatibus numquam reiciendis sed ullam unde. Accusamus aliquam eius perferendis provident rerum! Ea ipsam molestiae possimus recusandae.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolor dolore earum minus necessitatibus numquam reiciendis sed ullam unde. Accusamus aliquam eius perferendis provident rerum! Ea ipsam molestiae possimus recusandae.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolor dolore earum minus necessitatibus numquam reiciendis sed ullam unde. Accusamus aliquam eius perferendis provident rerum! Ea ipsam molestiae possimus recusandae.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolor dolore earum minus necessitatibus numquam reiciendis sed ullam unde. Accusamus aliquam eius perferendis provident rerum! Ea ipsam molestiae possimus recusandae.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolor dolore earum minus necessitatibus numquam reiciendis sed ullam unde. Accusamus aliquam eius perferendis provident rerum! Ea ipsam molestiae possimus recusandae.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolor dolore earum minus necessitatibus numquam reiciendis sed ullam unde. Accusamus aliquam eius perferendis provident rerum! Ea ipsam molestiae possimus recusandae.</p>
        <hr>
        <div class="form-check" style="width:90%; padding-left:5%;">
            <label class="form-check-label">
                <input class="form-check-input" type="radio" name="consent" v-model="consent" v-bind:value="true">
                I accept the above terms and agree to participate in the study
            </label>
            <label class="form-check-label">
                <input class="form-check-input" type="radio" name="consent" v-model="consent" v-bind:value="false">
                I do not wish to participate in the study
            </label>
        </div>
        <div class="form-group">
            <button @click="setConsent">Save</button>
        </div>

    </div>
</template>

<script lang="ts">

    export default {
        selector:'consent',
        data() {
            return {
                consent:null
            }

        },
        methods:{
            setConsent:function(e: Event){
                e.preventDefault();
                if(this.consent!=null){
                    this.$store.dispatch('userSettings/setResearchConsent', this.consent);
                }

            }
        },
        computed:{
            open:function(){

                return this.$store.getters['tabSettings/categories'].indexOf(this.category.identifier())>-1;
            }
        }

    }
</script>

<style lang="scss">

#zk-inlinetrainer-informed-consent{
    height:100%;
    overflow:auto;
}

</style>
