package com.kalic.utils;

import java.util.HashSet;

public class SnowflakeIdWorkerTest {
    public static HashSet<Long> idSet = new HashSet<>();

    public static void main(String[] args) {
        for (long i = 0; i < 1000; i++) {
            new Thread(new Worker(new SnowflakeIdWorker(1, 0))).start();
        }
    }

    static class Worker implements Runnable {

        private SnowflakeIdWorker snowflakeIdWorker;

        public Worker(SnowflakeIdWorker snowflakeIdWorker) {
            this.snowflakeIdWorker = snowflakeIdWorker;
        }

        @Override
        public void run() {
            for (int i = 0; i < 1; i++) {
                Long id = snowflakeIdWorker.nextId();
                synchronized (SnowflakeIdWorkerTest.class) {
                if (!idSet.add(id)) {
                    System.err.println("存在重复id:" + id);
                }
               }
            }
        }
    }
}
