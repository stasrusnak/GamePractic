<template>
        <div class="container">
                <canvas class="game" ref="game" :height="height" :width="width"></canvas>
            {{'FPS: '+fps}}
       </div>

</template>
<style src='./game.scss'/>
<script src="./game.js"/>

